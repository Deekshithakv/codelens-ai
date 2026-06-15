import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Features from "../components/Features";
import Footer from "../components/Footer";
import Hero from "../components/Hero";
import HowItWorks from "../components/HowItWorks";
import Navbar from "../components/Navbar";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-[#17191c]">
      <Navbar />
      <Hero />
      <Features />
      <HowItWorks />

      <section className="bg-[#f7f7f8] px-5 py-24 md:py-32">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.75 }}
          className="mx-auto max-w-[1200px] overflow-hidden rounded-3xl bg-[#fbe1d1] px-6 py-16 text-center md:px-16 md:py-24"
        >
          <p className="text-[13px] font-medium uppercase tracking-[0.12em] text-[#5d2a1a]">
            Your next review can be clearer
          </p>
          <h2 className="font-display mx-auto mt-5 max-w-[760px] text-[45px] leading-[1.02] md:text-[68px]">
            Give your code a thoughtful second look.
          </h2>
          <p className="mx-auto mt-6 max-w-[560px] text-[16px] leading-7 text-[#4c4c4c]">
            Start with the sample or paste your own code. Results stream in as
            soon as each specialist analysis is ready.
          </p>
          <Link
            to="/analyzer"
            className="group mx-auto mt-9 flex w-fit items-center gap-2 rounded-full bg-[#17191c] px-6 py-3.5 text-[15px] font-medium text-white transition hover:bg-[#34373b]"
          >
            Open CodeLens
            <ArrowRight
              className="transition-transform group-hover:translate-x-1"
              size={16}
            />
          </Link>
        </motion.div>
      </section>

      <Footer />
    </div>
  );
}
