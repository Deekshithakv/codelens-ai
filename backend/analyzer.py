# backend/analyzer.py
# This module calls Groq API with streaming enabled.
# Each function is a generator — it yields tokens one by one
# as they arrive from Groq, so the frontend gets real-time output.

import os
from groq import Groq
from dotenv import load_dotenv
from prompts import (
    build_explain_prompt,
    build_complexity_prompt,
    build_security_prompt,
    build_bug_prompt,
    build_detect_language_prompt
)

# Load GROQ_API_KEY from backend/.env file
load_dotenv()

# Single Groq client instance — reused for all requests
client = Groq(api_key=os.getenv("GROQ_API_KEY"))

# Best free model on Groq for code tasks
# Fast, accurate, 128k context window — handles large files easily
MODEL = "llama-3.3-70b-versatile"


def stream_explanation(code: str, language: str):
    """
    Sends explain prompt to Groq with stream=True.
    
    How streaming works:
    - Groq sends back chunks immediately as the model generates tokens
    - Each chunk has chunk.choices[0].delta.content with a partial word
    - We yield each token so main.py can push it to the frontend instantly
    - The frontend appends each token to the explanation panel in real time
    
    Yields: str — individual tokens (partial words or punctuation)
    """
    stream = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are an expert code explainer. Be concise, clear, and educational. Always follow the exact output format requested."
            },
            {
                "role": "user",
                "content": build_explain_prompt(code, language)
            }
        ],
        stream=True,
        max_tokens=1500,
        temperature=0.2   # low = consistent, factual explanations
    )

    for chunk in stream:
        token = chunk.choices[0].delta.content
        if token:
            yield token


def stream_complexity(code: str, language: str):
    """
    Sends complexity prompt to Groq with stream=True.
    
    Temperature 0.1 = very deterministic output.
    This ensures the O() notation always appears in parseable format
    so the frontend badge can extract it reliably with regex.
    
    Yields: str — individual tokens
    """
    stream = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are an algorithms and data structures expert. Be precise and follow the exact output format. Never add extra explanation."
            },
            {
                "role": "user",
                "content": build_complexity_prompt(code, language)
            }
        ],
        stream=True,
        max_tokens=300,
        temperature=0.1
    )

    for chunk in stream:
        token = chunk.choices[0].delta.content
        if token:
            yield token


def stream_security(code: str, language: str):
    """
    Sends security prompt to Groq with stream=True.
    
    Temperature 0.1 = deterministic, consistent vulnerability reports.
    The HIGH/MEDIUM/LOW pipe format must be consistent so the
    frontend SecurityWarnings component can parse each line correctly.
    
    Yields: str — individual tokens
    """
    stream = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": "You are a security auditor specializing in code review. Only report real vulnerabilities with high confidence. Never produce false positives. Follow the exact pipe-separated output format."
            },
            {
                "role": "user",
                "content": build_security_prompt(code, language)
            }
        ],
        stream=True,
        max_tokens=600,
        temperature=0.1
    )

    for chunk in stream:
        token = chunk.choices[0].delta.content
        if token:
            yield token


def stream_bugs(code: str, language: str):
    """
    Streams likely runtime, logic, and edge-case defects.

    Findings use a pipe-separated format so the frontend can turn completed
    lines into severity-aware cards while tokens are streaming.
    """
    stream = client.chat.completions.create(
        model=MODEL,
        messages=[
            {
                "role": "system",
                "content": (
                    "You are a senior software engineer reviewing code for "
                    "functional bugs. Be precise, avoid style feedback and "
                    "false positives, and follow the requested output format."
                )
            },
            {
                "role": "user",
                "content": build_bug_prompt(code, language)
            }
        ],
        stream=True,
        max_tokens=900,
        temperature=0.1
    )

    for chunk in stream:
        token = chunk.choices[0].delta.content
        if token:
            yield token


def detect_language(code: str) -> str:
    """
    Detects programming language from a code snippet.
    
    This is NOT streamed — it's a quick single call that returns
    one word like 'java' or 'python'. Used when user selects 'auto'
    in the language dropdown. Result is used to label the Monaco editor
    and included in all 3 analysis prompts for accuracy.
    
    Returns: str — lowercase language name
    """
    try:
        response = client.chat.completions.create(
            model=MODEL,
            messages=[
                {
                    "role": "user",
                    "content": build_detect_language_prompt(code)
                }
            ],
            stream=False,
            max_tokens=10,
            temperature=0   # must be deterministic — one word answer
        )
        return response.choices[0].message.content.strip().lower()
    except Exception:
        return "javascript"  # safe fallback if detection fails
