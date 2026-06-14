# backend/main.py
# FastAPI server with one main endpoint: POST /analyze
# Returns a Server-Sent Events (SSE) stream with 3 channels:
#   - "explain"    → line-by-line explanation tokens
#   - "complexity" → Big-O analysis tokens  
#   - "security"   → vulnerability warning tokens
#   - "done"       → signals all streams finished

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import StreamingResponse
import json
import threading
import queue
from analyzer import (
    stream_explanation,
    stream_complexity,
    stream_security,
    detect_language
)

app = FastAPI()

# CORS — allows the React frontend to call this backend
# Without this, the browser blocks cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev server
        "http://localhost:3000",   # fallback
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/")
def health_check():
    """
    Health check endpoint.
    Open http://localhost:8000 in browser to confirm backend is running.
    """
    return {"status": "CodeLens AI backend is running ✅", "model": "llama-3.3-70b-versatile"}


@app.post("/analyze")
async def analyze_code(request: Request):
    """
    Main analysis endpoint.
    
    Receives JSON body:
        { "code": "...", "language": "java" }
    
    How it works:
    1. Reads code and language from request body
    2. Auto-detects language if "auto" is selected
    3. Starts 3 background threads simultaneously:
           Thread 1 → stream_explanation() → pushes to queue with channel="explain"
           Thread 2 → stream_complexity()  → pushes to queue with channel="complexity"
           Thread 3 → stream_security()    → pushes to queue with channel="security"
    4. event_generator() reads from the shared queue and formats each
       token as an SSE event: data: {"channel": "explain", "token": "..."}\n\n
    5. React frontend reads the SSE stream, checks channel field,
       and appends token to the matching panel state variable
    
    Why threads instead of async?
    Groq's Python SDK uses synchronous iteration for streaming.
    Running 3 sync generators in threads lets them all run in parallel
    without blocking each other, feeding into one shared queue.
    """
    body = await request.json()
    code = body.get("code", "").strip()
    language = body.get("language", "auto")

    if not code:
        return {"error": "No code provided"}

    # Auto-detect language if not manually selected
    if language == "auto" or not language:
        language = detect_language(code)

    # Shared queue — all 3 threads push (channel, token) pairs here
    # Main thread reads from this queue and streams to frontend
    token_queue = queue.Queue()

    def run_stream(stream_fn, channel):
        """
        Runs one Groq streaming call in a background thread.
        
        Pushes each token as tuple (channel, token) into shared queue.
        When the stream ends, pushes (channel, None) as a sentinel
        so event_generator knows this stream is finished.
        """
        try:
            for token in stream_fn(code, language):
                token_queue.put((channel, token))
        except Exception as e:
            # Push error message as a token so frontend can display it
            token_queue.put((channel, f"\n[Error: {str(e)}]"))
        finally:
            # Sentinel value — None means this stream is done
            token_queue.put((channel, None))

    # Start all 3 analysis threads at the same time
    # This is why all 3 panels start streaming simultaneously
    threads = [
        threading.Thread(
            target=run_stream,
            args=(stream_explanation, "explain"),
            daemon=True
        ),
        threading.Thread(
            target=run_stream,
            args=(stream_complexity, "complexity"),
            daemon=True
        ),
        threading.Thread(
            target=run_stream,
            args=(stream_security, "security"),
            daemon=True
        ),
    ]

    for t in threads:
        t.start()

    def event_generator():
        """
        Generator function that reads from the shared queue.
        
        Formats each token as an SSE event string:
            data: {"channel": "explain", "token": "Hello"}\n\n
        
        The double newline \n\n is required by the SSE protocol —
        it tells the browser this event is complete.
        
        Keeps running until all 3 streams send their None sentinel.
        Times out after 60 seconds to prevent hanging connections.
        """
        finished_channels = set()

        while len(finished_channels) < 3:
            try:
                # Wait up to 60 seconds for next token
                channel, token = token_queue.get(timeout=60)

                if token is None:
                    # This stream finished — track it
                    finished_channels.add(channel)
                else:
                    # Format as SSE event and yield to frontend
                    payload = json.dumps({
                        "channel": channel,
                        "token": token
                    })
                    yield f"data: {payload}\n\n"

            except queue.Empty:
                # Timeout — stop to prevent hanging
                break

        # Final event — tells React frontend all streams are complete
        done_payload = json.dumps({"channel": "done", "token": ""})
        yield f"data: {done_payload}\n\n"

    return StreamingResponse(
        event_generator(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no"   # prevents nginx from buffering SSE
        }
    )