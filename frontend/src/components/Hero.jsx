import { motion } from "framer-motion";
import {
  ArrowRight,
  Bug,
  Check,
  CircleAlert,
  Code2,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

const reveal = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
  }),
};

function BugCard() {
  return (
    <motion.div
      animate={{ y: [0, -9, 0], rotate: [-1.5, -0.5, -1.5] }}
      transition={{ duration: 5.8, repeat: Infinity, ease: "easeInOut" }}
      className="card-shadow absolute left-[2%] top-[19%] hidden w-[245px] -rotate-2 rounded-3xl bg-white p-5 xl:block"
    >
      <div className="flex items-center justify-between">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <Bug size={15} />
          Bug detection
        </span>
        <span className="rounded-full bg-[#fbe1d1] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wide text-[#5d2a1a]">
          High
        </span>
      </div>
      <p className="mt-5 text-[15px] font-medium">Division by zero</p>
      <p className="mt-1 text-[12px] leading-5 text-[#777b86]">
        Empty input reaches line 7 without a guard.
      </p>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#5d2a1a]">
        <CircleAlert size={13} />
        Line 7
      </div>
    </motion.div>
  );
}

function SecurityCard() {
  return (
    <motion.div
      animate={{ y: [0, 11, 0], rotate: [1.5, 0.5, 1.5] }}
      transition={{ duration: 6.4, repeat: Infinity, ease: "easeInOut" }}
      className="card-shadow absolute right-[1%] top-[17%] hidden w-[230px] rotate-2 rounded-3xl bg-white p-5 xl:block"
    >
      <div className="flex items-center gap-2 text-[13px] font-medium">
        <ShieldCheck size={15} />
        Security review
      </div>
      <div className="mt-5 rounded-2xl bg-[#d3e3fc] p-4">
        <div className="flex items-center gap-2">
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white">
            <Check size={14} />
          </span>
          <div>
            <p className="text-[12px] font-medium">No exposed secrets</p>
            <p className="mt-0.5 text-[10px] text-[#4c4c4c]">12 checks passed</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ComplexityCard() {
  const bars = [32, 48, 39, 62, 54, 76, 68];

  return (
    <motion.div
      animate={{ y: [0, -7, 0], rotate: [1, 2, 1] }}
      transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
      className="card-shadow absolute bottom-[7%] left-[8%] hidden w-[260px] rotate-1 rounded-3xl bg-[#d3e3fc] p-5 xl:block"
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[12px] text-[#4c4c4c]">Time complexity</p>
          <p className="mt-1 text-[25px] font-medium tracking-[-0.04em]">
            O(n log n)
          </p>
        </div>
        <span className="rounded-full bg-white/70 px-2.5 py-1 text-[10px]">
          Efficient
        </span>
      </div>
      <div className="mt-5 flex h-12 items-end gap-2">
        {bars.map((height, index) => (
          <motion.span
            key={height}
            initial={{ height: 0 }}
            animate={{ height: `${height}%` }}
            transition={{ delay: 0.5 + index * 0.08, duration: 0.6 }}
            className="flex-1 rounded-t-full bg-[#557fb9]"
          />
        ))}
      </div>
    </motion.div>
  );
}

function ExplainCard() {
  return (
    <motion.div
      animate={{ y: [0, 9, 0], rotate: [-1, -2, -1] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="card-shadow absolute bottom-[5%] right-[7%] hidden w-[265px] -rotate-1 rounded-3xl bg-[#fbe1d1] p-5 xl:block"
    >
      <div className="flex items-center gap-2 text-[13px] font-medium">
        <Code2 size={15} />
        Plain-language explanation
      </div>
      <div className="mt-4 space-y-2.5">
        {[92, 76, 84].map((width, index) => (
          <motion.div
            key={width}
            initial={{ width: 0 }}
            animate={{ width: `${width}%` }}
            transition={{ delay: 0.8 + index * 0.12, duration: 0.7 }}
            className="h-2 rounded-full bg-[#5d2a1a]/20"
          />
        ))}
      </div>
      <div className="mt-4 flex items-center gap-2 text-[11px] text-[#5d2a1a]">
        <Sparkles size={13} />
        Generated in real time
      </div>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="hero-dawn relative min-h-[780px] overflow-hidden">
      <div className="dot-grid absolute inset-x-0 bottom-0 h-40 opacity-25 [mask-image:linear-gradient(to_bottom,transparent,black)]" />
      <BugCard />
      <SecurityCard />
      <ComplexityCard />
      <ExplainCard />

      <div className="relative z-10 mx-auto flex max-w-[850px] flex-col items-center px-5 pb-32 pt-28 text-center md:pt-36">
        <motion.div
          custom={0}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="flex items-center gap-2 rounded-full border border-black/10 bg-white/70 px-4 py-2 text-[13px] text-[#4c4c4c] backdrop-blur"
        >
          <Sparkles size={14} className="text-[#5d2a1a]" />
          A calmer way to understand code
        </motion.div>

        <motion.h1
          custom={0.08}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="font-display mt-8 text-[55px] leading-[0.98] text-[#17191c] sm:text-[72px] md:text-[88px]"
        >
          See what your code
          <br />
          is trying to tell you.
        </motion.h1>

        <motion.p
          custom={0.18}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mt-8 max-w-[620px] text-[17px] leading-7 text-[#4c4c4c] md:text-[18px]"
        >
          CodeLens explains unfamiliar logic, finds likely bugs, measures
          complexity, and surfaces security risks in one thoughtful review.
        </motion.p>

        <motion.div
          custom={0.28}
          initial="hidden"
          animate="visible"
          variants={reveal}
          className="mt-9 flex flex-wrap items-center justify-center gap-5"
        >
          <Link
            to="/analyzer"
            className="group flex items-center gap-2 rounded-full bg-[#17191c] px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#34373b]"
          >
            Analyze your code
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={16}
            />
          </Link>
          <a
            href="#features"
            className="text-[15px] font-medium text-[#17191c] underline decoration-[#a3a6af] underline-offset-4 transition hover:decoration-[#17191c]"
          >
            Explore the product
          </a>
        </motion.div>
      </div>
    </section>
  );
}
