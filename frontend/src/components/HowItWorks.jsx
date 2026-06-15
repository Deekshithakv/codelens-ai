import { motion } from "framer-motion";
import { ArrowRight, Code2, ScanSearch, Sparkles } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Code2,
    title: "Bring the code",
    description:
      "Paste a function, file, or unfamiliar snippet into the focused editor.",
  },
  {
    number: "02",
    icon: ScanSearch,
    title: "Run one review",
    description:
      "Four specialist analyses stream in parallel while you stay in context.",
  },
  {
    number: "03",
    icon: Sparkles,
    title: "Make the next move",
    description:
      "Read the reasoning, locate the issue, and apply a concrete correction.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-white py-24 md:py-32">
      <div className="mx-auto max-w-[1200px] px-5 xl:px-0">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#5d2a1a]">
            A simple workflow
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-[720px] text-[44px] leading-[1.05] md:text-[64px]">
            From pasted code to a clearer decision.
          </h2>
        </motion.div>

        <div className="relative mt-16 grid gap-5 md:grid-cols-3">
          <div className="absolute left-[16%] right-[16%] top-11 hidden h-px bg-black/10 md:block" />
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.title}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.4 }}
                transition={{ duration: 0.65, delay: index * 0.12 }}
                className="relative rounded-3xl bg-[#f7f7f8] p-7"
              >
                <div className="relative z-10 flex items-center justify-between">
                  <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white card-shadow">
                    <Icon size={19} strokeWidth={1.8} />
                  </span>
                  <span className="text-[12px] font-medium tracking-[0.12em] text-[#777b86]">
                    {step.number}
                  </span>
                </div>
                <h3 className="mt-16 text-[23px] font-medium tracking-[-0.03em]">
                  {step.title}
                </h3>
                <p className="mt-3 text-[15px] leading-6 text-[#4c4c4c]">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-10 z-20 hidden rounded-full bg-white p-1 text-[#777b86] md:block"
                    size={24}
                  />
                )}
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
