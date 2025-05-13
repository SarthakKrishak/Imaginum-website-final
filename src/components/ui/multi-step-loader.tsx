"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "motion/react";
import { useState, useEffect } from "react";

const CheckIcon = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
    </svg>
  );
};

const CheckFilled = ({ className }: { className?: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className={cn("w-6 h-6", className)}
    >
      <path
        fillRule="evenodd"
        d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
        clipRule="evenodd"
      />
    </svg>
  );
};

type LoadingState = {
  text: string;
};

const LoaderCore = ({
  loadingStates,
  value = 0,
}: {
  loadingStates: LoadingState[];
  value?: number;
}) => {
  return (
    <div className="flex relative justify-start max-w-xl mx-auto flex-col">
      {loadingStates.map((loadingState, index) => {
        const distance = Math.abs(index - value);
        const opacity = Math.max(1 - distance * 0.2, 0);

        return (
          <motion.div
            key={index}
            className={cn("text-left flex gap-3 mb-5")}
            initial={{ opacity: 0, y: -(value * 40) }}
            animate={{ opacity: opacity, y: -(value * 40) }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="flex-shrink-0">
              {index > value && (
                <CheckIcon className="text-blue-200 opacity-50" />
              )}
              {index <= value && (
                <CheckFilled
                  className={cn(
                    "text-blue-200",
                    value === index &&
                      "text-[#9DC9FF] opacity-100 drop-shadow-[0_0_8px_rgba(157,201,255,0.6)]"
                  )}
                />
              )}
            </div>
            <span
              className={cn(
                "text-blue-100 font-['Geist'] font-medium tracking-wide text-base",
                value === index && "text-[#9DC9FF] opacity-100 font-semibold"
              )}
            >
              {loadingState.text}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
};

export const MultiStepLoader = ({
  loadingStates,
  loading,
  duration = 2000,
  loop = true,
}: {
  loadingStates: LoadingState[];
  loading?: boolean;
  duration?: number;
  loop?: boolean;
}) => {
  const [currentState, setCurrentState] = useState(0);

  useEffect(() => {
    if (!loading) {
      setCurrentState(0);
      return;
    }
    const timeout = setTimeout(() => {
      setCurrentState((prevState) =>
        loop
          ? prevState === loadingStates.length - 1
            ? 0
            : prevState + 1
          : Math.min(prevState + 1, loadingStates.length - 1)
      );
    }, duration);

    return () => clearTimeout(timeout);
  }, [currentState, loading, loop, loadingStates.length, duration]);

  return (
    <AnimatePresence mode="wait">
      {loading && (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition: { duration: 0.8, ease: "easeInOut" },
          }}
          className="w-full h-full fixed inset-0 z-[100] flex items-center justify-center bg-slate-950 bg-opacity-90 backdrop-blur-xl"
        >
          <div className="relative">
            {/* Background decorative gradient */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vw] max-w-xl h-80 rounded-full bg-gradient-to-b from-sky-700 to-transparent opacity-10 blur-3xl" />

            {/* Main content */}
            <div className="relative z-10">
              {/* Logo or brand identifier */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                className="text-center mb-10"
              >
              </motion.div>

              {/* Loading states */}
              <LoaderCore value={currentState} loadingStates={loadingStates} />

              {/* Progress indicator */}
              <motion.div
                className="mt-10 flex justify-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-slate-800 h-1 w-56 rounded-full overflow-hidden">
                  <motion.div
                    className="bg-gradient-to-r from-slate-950 to-sky-700 h-full"
                    initial={{ width: "0%" }}
                    animate={{
                      width: `${
                        ((currentState + 1) / loadingStates.length) * 100
                      }%`,
                    }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
