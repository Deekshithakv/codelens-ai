import { motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  Brain,
  Bug,
  CheckCircle2,
  ShieldCheck,
} from "lucide-react";

const features = [
  {
    icon: Bug,
    title: "Bug detection",
    description:
      "Find likely runtime failures, broken logic, and edge cases with line-level fixes.",
    tone: "warm",
    meta: "Severity + fix",
  },
  {
    icon: Brain,
    title: "Code explanation",
    description:
      "Turn unfamiliar code into a guided walkthrough of every meaningful block.",
    tone: "white",
    meta: "Line by line",
  },
  {
    icon: ShieldCheck,
    title: "Security review",
    description:
      "Surface high-confidence vulnerabilities without drowning in false positives.",
    tone: "cool",
    meta: "Risk aware",
  },
  {
    icon: Activity,
    title: "Complexity analysis",
    description:
      "Understand time, space, dominant operations, and concrete optimization paths.",
    tone: "white",
    meta: "Big-O insight",
  },
];

const toneClasses = {
  warm: "bg-[#fbe1d1]",
  cool: "bg-[#d3e3fc]",
  white: "bg-white card-shadow",
};

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Features() {
  return (
    <section id="features" className="bg-[#f7f7f8] py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 md:grid-cols-[0.8fr_1.2fr] md:items-end"
        >
          <div>
            <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#5d2a1a]">
              One complete review
            </p>
            <h2 className="font-display mt-5 text-[44px] leading-[1.04] md:text-[64px]">
              Less noise.
              <br />
              More useful signal.
            </h2>
          </div>
          <p className="max-w-[540px] text-[17px] leading-7 text-[#4c4c4c] md:justify-self-end">
            Four focused analysis streams work in parallel, then arrive as a
            clear set of insights you can actually act on.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
          className="mt-16 grid gap-5 md:grid-cols-2"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;

            return (
              <motion.article
                key={feature.title}
                variants={item}
                whileHover={{ y: -6 }}
                className={`group min-h-[280px] rounded-3xl p-7 transition-shadow ${toneClasses[feature.tone]}`}
              >
                <div className="flex items-start justify-between">
                  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/75 text-[#17191c]">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <ArrowUpRight
                    size={18}
                    className="text-[#777b86] transition-transform group-hover:-translate-y-1 group-hover:translate-x-1"
                  />
                </div>

                <div className="mt-20">
                  <p className="text-[12px] font-medium uppercase tracking-[0.12em] text-[#777b86]">
                    {String(index + 1).padStart(2, "0")} / {feature.meta}
                  </p>
                  <h3 className="mt-3 text-[25px] font-medium tracking-[-0.035em]">
                    {feature.title}
                  </h3>
                  <p className="mt-3 max-w-[440px] text-[15px] leading-6 text-[#4c4c4c]">
                    {feature.description}
                  </p>
                </div>
              </motion.article>
            );
          })}
        </motion.div>

        <motion.div
          id="capabilities"
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.75 }}
          className="card-shadow mt-20 grid overflow-hidden rounded-3xl bg-white lg:grid-cols-[0.85fr_1.15fr]"
        >
          <div className="flex flex-col justify-between p-8 md:p-12">
            <div>
              <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#5d2a1a]">
                Designed for clarity
              </p>
              <h3 className="font-display mt-5 text-[42px] leading-[1.05] md:text-[52px]">
                A review that reads like a thoughtful teammate.
              </h3>
              <p className="mt-6 max-w-[430px] text-[16px] leading-7 text-[#4c4c4c]">
                Results stay connected to the code: line locations, concise
                reasoning, and a practical next step instead of vague advice.
              </p>
            </div>
            <div className="mt-10 flex flex-wrap gap-3">
              {["Streaming results", "Line aware", "Multi-language"].map(
                (label) => (
                  <span
                    key={label}
                    className="rounded-full border border-black/10 px-3 py-1.5 text-[12px] text-[#4c4c4c]"
                  >
                    {label}
                  </span>
                ),
              )}
            </div>
          </div>

          <div className="bg-[#17191c] p-5 md:p-8">
            <div className="overflow-hidden rounded-2xl bg-[#f7f7f8]">
              <div className="flex items-center gap-2 border-b border-black/5 bg-white px-4 py-3">
                <span className="h-2.5 w-2.5 rounded-full bg-[#d7b4a0]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d3e3fc]" />
                <span className="h-2.5 w-2.5 rounded-full bg-[#d8ded4]" />
                <span className="ml-2 text-[11px] text-[#777b86]">
                  checkout.py
                </span>
              </div>
              <div className="grid md:grid-cols-[1fr_0.9fr]">
                <div className="border-b border-black/5 p-5 font-mono text-[12px] leading-7 text-[#4c4c4c] md:border-b-0 md:border-r">
                  <p>
                    <span className="text-[#8b5f4c]">def</span>{" "}
                    <span className="text-[#315d89]">average</span>(values):
                  </p>
                  <p className="pl-4">total = sum(values)</p>
                  <p className="rounded-lg bg-[#fbe1d1] pl-4 text-[#5d2a1a]">
                    return total / len(values)
                  </p>
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-2 text-[12px] font-medium">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#fbe1d1]">
                      <Bug size={12} />
                    </span>
                    Empty input can crash
                  </div>
                  <p className="mt-3 text-[11px] leading-5 text-[#777b86]">
                    When values is empty, len(values) returns zero.
                  </p>
                  <div className="mt-4 flex items-start gap-2 rounded-xl bg-[#d3e3fc] p-3 text-[11px] leading-5">
                    <CheckCircle2 className="mt-0.5 shrink-0" size={13} />
                    Return early or raise a clear error for empty input.
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
