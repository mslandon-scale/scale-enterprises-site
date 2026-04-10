"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";

function AnimatedNumber({ value, suffix = "", prefix = "" }: { value: number; suffix?: string; prefix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const duration = 2000;
    const startTime = performance.now();

    function animate(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.round(eased * value);
      setDisplay(start);
      if (progress < 1) requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);
  }, [isInView, value]);

  return (
    <span ref={ref} className="font-display text-[40px] lg:text-[56px] text-accent-gold leading-none font-extrabold">
      {prefix}{display.toLocaleString()}{suffix}
    </span>
  );
}

const stats = [
  { value: 2.4, prefix: "$", suffix: "B+", display: "Revenue Generated Across Client Businesses", multiplier: 10 },
  { value: 300, prefix: "", suffix: "+", display: "Businesses Transformed", multiplier: 1 },
  { value: 90, prefix: "", suffix: " Min", display: "Average Weekly Time After Transformation", multiplier: 1 },
];

export default function StatsRow() {
  return (
    <section className="relative bg-navy py-20 lg:py-32 overflow-hidden" id="results">
      {/* Background shapes */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ y: [0, -18, 0] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[12%] left-[6%] w-6 h-6 rounded-full bg-accent-gold/[0.08]"
        />
        <motion.div
          animate={{ y: [0, 16, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[18%] right-[8%] w-7 h-7 border-2 border-white/[0.04] rotate-45"
        />
        <motion.div
          animate={{ y: [0, -12, 0] }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-[40%] right-[4%] w-5 h-5 bg-accent-gold/[0.06] rotate-12"
        />
        <div className="absolute top-0 right-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
        <div className="absolute top-0 left-[30%] w-px h-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 lg:px-6">
        <div className="flex flex-col lg:flex-row items-center justify-center">
          {stats.map((stat, i) => (
            <div key={stat.display} className="flex flex-col lg:flex-row items-center">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.6, ease: "easeOut" as const, delay: i * 0.1 }}
                className="flex flex-col items-center text-center py-8 lg:py-0 lg:px-12"
              >
                {stat.value === 2.4 ? (
                  <span className="font-display text-[40px] lg:text-[56px] text-accent-gold leading-none font-extrabold">
                    $2.4B+
                  </span>
                ) : (
                  <AnimatedNumber value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                )}
                <span className="font-body text-[13px] uppercase tracking-stat text-white/50 font-semibold mt-3 max-w-[200px]">
                  {stat.display}
                </span>
              </motion.div>
              {i < stats.length - 1 && (
                <>
                  <div className="hidden lg:block w-px h-[60px] bg-white/10" />
                  <div className="lg:hidden w-24 h-px bg-white/10" />
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
