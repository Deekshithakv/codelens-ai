import { useState } from "react";
import Editor from "@monaco-editor/react";
import { Link } from "react-router-dom";
import {
Shield,
Activity,
Brain,
ArrowLeft,
} from "lucide-react";

const BACKEND_URL = "http://localhost:8000";

export default function AnalyzerPage() {
const [code, setCode] = useState(`def calculate_total():
prices = {
"apple": 20,
"banana": 10,
"orange": 15
}


total = sum(prices.values())
print(total)


calculate_total()`);

const [language, setLanguage] =
useState("python");

const [complexity, setComplexity] =
useState("");

const [security, setSecurity] =
useState("");

const [explanation, setExplanation] =
useState("");

const [loading, setLoading] =
useState(false);

async function analyzeCode() {
try {
setLoading(true);


  setComplexity("");
  setSecurity("");
  setExplanation("");

  const response = await fetch(
    `${BACKEND_URL}/analyze`,
    {
      method: "POST",
      headers: {
        "Content-Type":
          "application/json",
      },
      body: JSON.stringify({
        code,
        language,
      }),
    }
  );

  if (!response.ok) {
    throw new Error(
      "Backend connection failed"
    );
  }

  const reader =
    response.body.getReader();

  const decoder =
    new TextDecoder();

  let buffer = "";

  while (true) {
    const {
      done,
      value,
    } = await reader.read();

    if (done) break;

    buffer += decoder.decode(value);

    const events =
      buffer.split("\n\n");

    buffer = events.pop() || "";

    for (const event of events) {
      if (
        !event.startsWith("data:")
      )
        continue;

      try {
        const payload = JSON.parse(
          event.replace(
            "data: ",
            ""
          )
        );

        if (
          payload.channel ===
          "complexity"
        ) {
          setComplexity(
            (prev) =>
              prev +
              payload.token
          );
        }

        if (
          payload.channel ===
          "security"
        ) {
          setSecurity(
            (prev) =>
              prev +
              payload.token
          );
        }

        if (
          payload.channel ===
          "explain"
        ) {
          setExplanation(
            (prev) =>
              prev +
              payload.token
          );
        }

        if (
          payload.channel ===
          "done"
        ) {
          setLoading(false);
        }
      } catch (err) {
        console.error(err);
      }
    }
  }
} catch (err) {
  console.error(err);

  setExplanation(
    "Unable to connect to backend."
  );

  setLoading(false);
}


}

return ( <div className="min-h-screen bg-slate-950 text-white">


  <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[160px]" />

  <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[160px]" />

  <nav className="relative z-10 border-b border-slate-800 backdrop-blur-xl bg-slate-950/70">

    <div className="max-w-7xl mx-auto px-6 lg:px-8 py-5 flex justify-between items-center">

      <Link
        to="/"
        className="flex items-center gap-3 text-white"
      >
        <ArrowLeft size={18} />

        <span className="font-semibold">
          Back
        </span>
      </Link>

     <h1 className="text-3xl font-bold">
  <span className="text-blue-400">
    CodeLens
  </span>{" "}
  <span className="text-cyan-300">
    AI
  </span>
</h1>

      <button
        onClick={analyzeCode}
        disabled={loading}
        className="px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-500 transition"
      >
        {loading
          ? "Analyzing..."
          : "Analyze"}
      </button>

    </div>

  </nav>

  <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-8">

    <div className="grid lg:grid-cols-[58%_42%] gap-6">

      <div className="rounded-3xl border border-slate-800 overflow-hidden bg-slate-900/70 backdrop-blur-xl">

        <div className="border-b border-slate-800 p-4 flex justify-between items-center">

          <h2 className="font-semibold">
            Source Code
          </h2>

          <select
            value={language}
            onChange={(e) =>
              setLanguage(
                e.target.value
              )
            }
            className="bg-slate-800 rounded-lg px-4 py-2 text-sm"
          >
            <option value="python">
              Python
            </option>

            <option value="java">
              Java
            </option>

            <option value="javascript">
              JavaScript
            </option>
          </select>

        </div>

        <Editor
          height="70vh"
          theme="vs-dark"
          language={language}
          value={code}
          onChange={(value) =>
            setCode(value || "")
          }
        />

      </div>

      <div className="space-y-5 h-[70vh] overflow-auto pr-2">

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5">

          <div className="flex items-center gap-3 mb-4">
            <Activity
              size={20}
              className="text-violet-400"
            />

            <h2 className="font-semibold">
              Complexity Analysis
            </h2>
          </div>

          <pre className="whitespace-pre-wrap text-slate-300 text-sm">
            {complexity ||
              "Run analysis to view complexity information."}
          </pre>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5">

          <div className="flex items-center gap-3 mb-4">
            <Shield
              size={20}
              className="text-green-400"
            />

            <h2 className="font-semibold">
              Security Scan
            </h2>
          </div>

          <pre className="whitespace-pre-wrap text-slate-300 text-sm">
            {security ||
              "Run analysis to view security issues."}
          </pre>

        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 backdrop-blur-xl p-5">

          <div className="flex items-center gap-3 mb-4">
            <Brain
              size={20}
              className="text-cyan-400"
            />

            <h2 className="font-semibold">
              Explanation
            </h2>
          </div>

          <pre className="whitespace-pre-wrap text-slate-300 text-sm">
            {explanation ||
              "Run analysis to generate AI explanations."}
          </pre>

        </div>

      </div>

    </div>

  </div>

</div>


);
}
