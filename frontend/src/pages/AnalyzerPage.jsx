import { useState } from "react";
import Editor from "@monaco-editor/react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Activity,
  ArrowLeft,
  Brain,
  Braces,
  Bug,
  ChevronRight,
  CircleHelp,
  Code2,
  FileCode2,
  Gauge,
  LoaderCircle,
  Play,
  ScanSearch,
  Shield,
  Sparkles,
} from "lucide-react";
import BugFindings from "../components/BugFindings";

const BACKEND_URL =
  import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";

const starterCode = `def calculate_average(numbers):
    total = 0

    for number in numbers:
        total += number

    return total / len(numbers)


print(calculate_average([]))`;

const languages = [
  ["auto", "Auto detect"],
  ["python", "Python"],
  ["javascript", "JavaScript"],
  ["typescript", "TypeScript"],
  ["java", "Java"],
  ["cpp", "C++"],
  ["csharp", "C#"],
  ["go", "Go"],
  ["rust", "Rust"],
  ["sql", "SQL"],
];

const navigation = [
  { label: "Workspace", icon: Code2, href: "#workspace" },
  { label: "Bug detection", icon: Bug, href: "#bugs" },
  { label: "Security", icon: Shield, href: "#security" },
  { label: "Complexity", icon: Gauge, href: "#complexity" },
  { label: "Explanation", icon: Brain, href: "#explanation" },
];

function ResultPanel({
  id,
  icon: Icon,
  title,
  description,
  tone = "white",
  children,
}) {
  const tones = {
    white: "bg-white",
    warm: "bg-[#fbe1d1]",
    cool: "bg-[#d3e3fc]",
  };

  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`scroll-mt-6 overflow-hidden rounded-3xl ${tones[tone]} ${
        tone === "white" ? "card-shadow" : ""
      }`}
    >
      <div className="flex items-start gap-3 border-b border-black/5 px-5 py-4">
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/75">
          <Icon className="text-[#17191c]" size={16} strokeWidth={1.8} />
        </span>
        <div>
          <h2 className="text-[14px] font-medium text-[#17191c]">{title}</h2>
          <p className="mt-1 text-[11px] text-[#777b86]">{description}</p>
        </div>
      </div>
      <div className="p-5">{children}</div>
    </motion.section>
  );
}

function TextResult({ value, placeholder, loading }) {
  if (!value && loading) {
    return (
      <div className="flex min-h-[120px] items-center justify-center gap-2 text-[12px] text-[#777b86]">
        <LoaderCircle className="animate-spin text-[#5d2a1a]" size={15} />
        Analyzing...
      </div>
    );
  }

  return (
    <pre className="min-h-[90px] whitespace-pre-wrap font-sans text-[12px] leading-6 text-[#4c4c4c]">
      {value || placeholder}
    </pre>
  );
}

export default function AnalyzerPage() {
  const [code, setCode] = useState(starterCode);
  const [language, setLanguage] = useState("python");
  const [complexity, setComplexity] = useState("");
  const [security, setSecurity] = useState("");
  const [explanation, setExplanation] = useState("");
  const [bugs, setBugs] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function analyzeCode() {
    if (!code.trim() || loading) {
      return;
    }

    setLoading(true);
    setError("");
    setComplexity("");
    setSecurity("");
    setExplanation("");
    setBugs("");

    try {
      const response = await fetch(`${BACKEND_URL}/analyze`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          code,
          language,
        }),
      });

      if (!response.ok || !response.body) {
        throw new Error("The analysis service is unavailable.");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";

      while (true) {
        const { done, value } = await reader.read();

        if (done) {
          break;
        }

        buffer += decoder.decode(value, { stream: true });
        const events = buffer.split("\n\n");
        buffer = events.pop() || "";

        for (const event of events) {
          if (!event.startsWith("data:")) {
            continue;
          }

          const payload = JSON.parse(event.replace(/^data:\s*/, ""));

          if (payload.channel === "complexity") {
            setComplexity((current) => current + payload.token);
          } else if (payload.channel === "security") {
            setSecurity((current) => current + payload.token);
          } else if (payload.channel === "explain") {
            setExplanation((current) => current + payload.token);
          } else if (payload.channel === "bugs") {
            setBugs((current) => current + payload.token);
          }
        }
      }
    } catch (requestError) {
      console.error(requestError);
      setError(
        "Could not reach the backend. Make sure FastAPI is running on port 8000.",
      );
    } finally {
      setLoading(false);
    }
  }

  const lineCount = code ? code.split("\n").length : 0;

  return (
    <div className="min-h-screen bg-[#f7f7f8] text-[#17191c]">
      <div className="mx-auto flex max-w-[1600px]">
        <aside className="sticky top-0 hidden h-screen w-[230px] shrink-0 flex-col p-5 lg:flex">
          <Link to="/" className="flex items-center gap-2.5 px-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#17191c] text-white">
              <Braces size={17} strokeWidth={1.8} />
            </span>
            <span className="text-[17px] font-medium tracking-[-0.03em]">
              CodeLens <span className="text-[#777b86]">AI</span>
            </span>
          </Link>

          <nav className="mt-12 space-y-1">
            <p className="mb-3 px-3 text-[10px] font-medium uppercase tracking-[0.14em] text-[#777b86]">
              Analyze
            </p>
            {navigation.map((item, index) => {
              const Icon = item.icon;

              return (
                <a
                  key={item.label}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-xl px-3 py-2.5 text-[13px] transition ${
                    index === 0
                      ? "bg-white font-medium card-shadow"
                      : "text-[#4c4c4c] hover:bg-white/70"
                  }`}
                >
                  <Icon size={15} strokeWidth={1.8} />
                  {item.label}
                  {index === 0 && (
                    <ChevronRight className="ml-auto" size={13} />
                  )}
                </a>
              );
            })}
          </nav>

          <div className="mt-auto rounded-3xl bg-[#d3e3fc] p-5">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/75">
              <CircleHelp size={16} />
            </span>
            <p className="mt-5 text-[13px] font-medium">A better first scan</p>
            <p className="mt-2 text-[11px] leading-5 text-[#4c4c4c]">
              Review AI findings alongside tests and your own understanding of
              the codebase.
            </p>
          </div>
        </aside>

        <main id="workspace" className="min-w-0 flex-1 px-4 pb-10 pt-4 md:px-6">
          <header className="sticky top-3 z-40 flex items-center justify-between gap-4 rounded-full bg-white/90 px-4 py-2.5 card-shadow backdrop-blur-xl md:px-5">
            <div className="flex items-center gap-3">
              <Link
                to="/"
                aria-label="Back to home"
                className="flex h-9 w-9 items-center justify-center rounded-full transition hover:bg-[#f7f7f8] lg:hidden"
              >
                <ArrowLeft size={16} />
              </Link>
              <div className="hidden items-center gap-2 lg:flex">
                <FileCode2 size={15} className="text-[#777b86]" />
                <span className="text-[12px] text-[#777b86]">
                  Analysis workspace
                </span>
              </div>
              <div className="flex items-center gap-2 lg:hidden">
                <Braces size={17} />
                <span className="text-[14px] font-medium">CodeLens AI</span>
              </div>
            </div>

            <button
              type="button"
              onClick={analyzeCode}
              disabled={loading || !code.trim()}
              className="flex items-center gap-2 rounded-full bg-[#17191c] px-5 py-2.5 text-[13px] font-medium text-white transition hover:bg-[#34373b] disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? (
                <LoaderCircle className="animate-spin" size={15} />
              ) : (
                <Play size={13} fill="currentColor" />
              )}
              {loading ? "Reviewing code" : "Run analysis"}
            </button>
          </header>

          <div className="mx-auto mt-10 max-w-[1300px]">
            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55 }}
              className="mb-8"
            >
              <div className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.12em] text-[#5d2a1a]">
                <Sparkles size={13} />
                AI code review
              </div>
              <h1 className="font-display mt-4 text-[42px] leading-[1.03] md:text-[54px]">
                What should we look at?
              </h1>
              <p className="mt-4 max-w-[650px] text-[14px] leading-6 text-[#4c4c4c]">
                Paste your code below. CodeLens will explain the logic and
                inspect it for bugs, security risks, and expensive operations.
              </p>
            </motion.div>

            {error && (
              <div className="mb-5 flex items-center gap-3 rounded-2xl bg-[#fbe1d1] px-4 py-3 text-[12px] text-[#5d2a1a]">
                <Shield className="shrink-0" size={16} />
                {error}
              </div>
            )}

            <div className="grid items-start gap-5 xl:grid-cols-[minmax(0,1.15fr)_minmax(380px,0.85fr)]">
              <motion.section
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.08 }}
                className="editor-shell relative overflow-hidden rounded-3xl bg-white card-shadow xl:sticky xl:top-24"
              >
                {loading && (
                  <div className="scan-line pointer-events-none absolute inset-x-0 top-[70px] z-20 h-px bg-gradient-to-r from-transparent via-[#5d2a1a] to-transparent" />
                )}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-black/5 px-5 py-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full bg-[#5d2a1a]" />
                      <h2 className="text-[13px] font-medium">Source code</h2>
                    </div>
                    <p className="mt-1 pl-4 text-[10px] text-[#777b86]">
                      {lineCount} {lineCount === 1 ? "line" : "lines"}
                    </p>
                  </div>

                  <select
                    aria-label="Programming language"
                    value={language}
                    onChange={(event) => setLanguage(event.target.value)}
                    className="rounded-full border border-black/10 bg-[#f7f7f8] px-4 py-2 text-[11px] text-[#4c4c4c] outline-none transition focus:border-[#777b86]"
                  >
                    {languages.map(([value, label]) => (
                      <option key={value} value={value}>
                        {label}
                      </option>
                    ))}
                  </select>
                </div>

                <Editor
                  height="67vh"
                  theme="light"
                  language={language === "auto" ? "plaintext" : language}
                  value={code}
                  onChange={(value) => setCode(value || "")}
                  options={{
                    fontSize: 13,
                    fontFamily:
                      '"SFMono-Regular", Consolas, "Liberation Mono", monospace',
                    lineHeight: 23,
                    minimap: { enabled: false },
                    padding: { top: 20, bottom: 20 },
                    scrollBeyondLastLine: false,
                    smoothScrolling: true,
                    wordWrap: "on",
                    renderLineHighlight: "line",
                    overviewRulerBorder: false,
                    hideCursorInOverviewRuler: true,
                    lineNumbersMinChars: 3,
                  }}
                />
              </motion.section>

              <div className="space-y-5">
                <ResultPanel
                  id="bugs"
                  icon={Bug}
                  title="Bug detection"
                  description="Runtime failures, logic defects, and edge cases"
                  tone="warm"
                >
                  <BugFindings text={bugs} loading={loading} />
                </ResultPanel>

                <ResultPanel
                  id="security"
                  icon={Shield}
                  title="Security review"
                  description="High-confidence vulnerability scan"
                  tone="white"
                >
                  <TextResult
                    value={security}
                    loading={loading}
                    placeholder="Run analysis to review security risks."
                  />
                </ResultPanel>

                <ResultPanel
                  id="complexity"
                  icon={Activity}
                  title="Complexity"
                  description="Time, space, and dominant operations"
                  tone="cool"
                >
                  <TextResult
                    value={complexity}
                    loading={loading}
                    placeholder="Run analysis to calculate code complexity."
                  />
                </ResultPanel>

                <ResultPanel
                  id="explanation"
                  icon={ScanSearch}
                  title="Code explanation"
                  description="A guided walkthrough of each meaningful block"
                  tone="white"
                >
                  <TextResult
                    value={explanation}
                    loading={loading}
                    placeholder="Run analysis to generate an explanation."
                  />
                </ResultPanel>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
