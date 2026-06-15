import { motion } from "framer-motion";
import {
  AlertTriangle,
  Bug,
  CheckCircle2,
  CircleAlert,
  Lightbulb,
  MapPin,
} from "lucide-react";

const severityStyles = {
  HIGH: {
    badge: "bg-[#5d2a1a] text-white",
    border: "border-[#5d2a1a]/15",
    icon: "text-[#5d2a1a]",
    tint: "bg-[#fbe1d1]",
  },
  MEDIUM: {
    badge: "bg-[#fbe1d1] text-[#5d2a1a]",
    border: "border-[#d8b29d]/40",
    icon: "text-[#7b4937]",
    tint: "bg-[#fff8f3]",
  },
  LOW: {
    badge: "bg-[#d3e3fc] text-[#315d89]",
    border: "border-[#adc5e7]/40",
    icon: "text-[#315d89]",
    tint: "bg-[#f3f7fd]",
  },
};

function parseBugFindings(text) {
  const findings = [];

  for (const line of text.split(/\r?\n/)) {
    const parts = line.split("|").map((part) => part.trim());

    if (parts.length < 7 || parts[0] !== "BUG") {
      continue;
    }

    const severity = parts[1].toUpperCase();
    const whyIndex = parts.findIndex((part) => part.startsWith("WHY:"));
    const fixIndex = parts.findIndex((part) => part.startsWith("FIX:"));

    if (!severityStyles[severity] || whyIndex < 0 || fixIndex < 0) {
      continue;
    }

    findings.push({
      severity,
      line: parts[2],
      category: parts[3],
      title: parts.slice(4, whyIndex).join(" | "),
      reason: parts
        .slice(whyIndex, fixIndex)
        .join(" | ")
        .replace(/^WHY:\s*/, ""),
      fix: parts
        .slice(fixIndex)
        .join(" | ")
        .replace(/^FIX:\s*/, ""),
    });
  }

  return findings;
}

export default function BugFindings({ text, loading }) {
  const findings = parseBugFindings(text);
  const noBugs = text.includes("NO_BUGS");

  if (!text && !loading) {
    return (
      <div className="flex min-h-[190px] flex-col items-center justify-center text-center">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#fbe1d1]">
          <Bug className="text-[#5d2a1a]" size={19} />
        </div>
        <p className="mt-4 text-[14px] font-medium text-[#17191c]">
          Ready for a bug review
        </p>
        <p className="mt-1 max-w-[300px] text-[12px] leading-5 text-[#777b86]">
          Run the analyzer to inspect runtime failures, logic mistakes, and
          missed edge cases.
        </p>
      </div>
    );
  }

  if (noBugs) {
    return (
      <div className="flex items-start gap-3 rounded-2xl bg-[#eef4ec] p-4">
        <CheckCircle2 className="mt-0.5 shrink-0 text-[#4d6848]" size={18} />
        <div>
          <p className="text-[14px] font-medium text-[#334630]">
            No likely functional bugs detected
          </p>
          <p className="mt-1 text-[12px] leading-5 text-[#60715d]">
            The scan did not find a high-confidence defect in this snippet.
          </p>
        </div>
      </div>
    );
  }

  if (findings.length === 0) {
    return (
      <div className="flex min-h-[150px] items-center justify-center gap-3 text-[13px] text-[#777b86]">
        <CircleAlert
          className={loading ? "animate-pulse text-[#5d2a1a]" : "text-[#777b86]"}
          size={17}
        />
        {loading ? "Inspecting code paths..." : text}
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[12px] text-[#777b86]">
          {findings.length} likely {findings.length === 1 ? "defect" : "defects"}{" "}
          found
        </p>
        {loading && (
          <span className="flex items-center gap-2 text-[11px] text-[#5d2a1a]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#5d2a1a]" />
            Still scanning
          </span>
        )}
      </div>

      {findings.map((finding, index) => {
        const styles = severityStyles[finding.severity];

        return (
          <motion.article
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: index * 0.06 }}
            key={`${finding.line}-${finding.title}-${index}`}
            className={`rounded-2xl border p-4 ${styles.border} ${styles.tint}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex min-w-0 items-start gap-3">
                <AlertTriangle
                  className={`mt-0.5 shrink-0 ${styles.icon}`}
                  size={17}
                />
                <div>
                  <p className="text-[14px] font-medium text-[#17191c]">
                    {finding.title}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.1em] text-[#777b86]">
                    {finding.category}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`rounded-full px-2.5 py-1 text-[9px] font-medium tracking-wide ${styles.badge}`}
                >
                  {finding.severity}
                </span>
                <span className="flex items-center gap-1 text-[10px] text-[#777b86]">
                  <MapPin size={11} />
                  {finding.line}
                </span>
              </div>
            </div>

            <p className="mt-4 text-[12px] leading-5 text-[#4c4c4c]">
              {finding.reason}
            </p>

            <div className="mt-4 flex items-start gap-2 rounded-xl bg-white/70 p-3 text-[12px] leading-5 text-[#315d89]">
              <Lightbulb className="mt-0.5 shrink-0" size={14} />
              <span>{finding.fix}</span>
            </div>
          </motion.article>
        );
      })}
    </div>
  );
}
