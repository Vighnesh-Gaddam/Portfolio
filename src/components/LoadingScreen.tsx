// "use client";

// import { motion } from "framer-motion";
// import { useEffect, useState } from "react";

// export const LoadingScreen = () => {
//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setProgress((prev) => (prev < 100 ? prev + 1 : 100));
//     }, 20);
//     return () => clearInterval(interval);
//   }, []);

//   const name = "VIGHNESH GADDAM";
//   const letters = Array.from(name);

//   return (
//     <motion.div
//       initial={{ opacity: 1 }}
//       exit={{ opacity: 0, transition: { duration: 0.8, ease: "easeInOut" } }}
//       className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
//     >
//       <div className="relative flex flex-col items-center">
//         {/* Animated Name */}
//         <div className="flex mb-4">
//           {letters.map((char, i) => (
//             <motion.span
//               key={i}
//               initial={{ opacity: 0, y: 10 }}
//               animate={{ opacity: 1, y: 0 }}
//               transition={{
//                 delay: i * 0.05,
//                 duration: 0.5,
//                 ease: [0.22, 1, 0.36, 1],
//               }}
//               className="text-xl md:text-2xl font-bold tracking-[0.3em] text-main"
//             >
//               {char === " " ? "\u00A0" : char}
//             </motion.span>
//           ))}
//         </div>

//         {/* Progress Container */}
//         <div className="w-48 h-[2px] bg-primary/10 rounded-full overflow-hidden relative">
//           <motion.div
//             initial={{ width: 0 }}
//             animate={{ width: `${progress}%` }}
//             className="absolute h-full bg-primary"
//           />
//         </div>

//         {/* Percentage Counter */}
//         <motion.span 
//           initial={{ opacity: 0 }}
//           animate={{ opacity: 1 }}
//           className="mt-4 text-[10px] font-mono tracking-widest text-muted"
//         >
//           {progress}%
//         </motion.span>
//       </div>

//       {/* Background Decorative Elements */}
//       <motion.div 
//         animate={{ 
//           scale: [1, 1.2, 1],
//           opacity: [0.03, 0.06, 0.03] 
//         }}
//         transition={{ duration: 4, repeat: Infinity }}
//         className="absolute w-[500px] h-[500px] bg-primary rounded-full blur-[120px] -z-10"
//       />
//     </motion.div>
//   );
// };

"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress simulation
    const interval = setInterval(() => {
      setProgress((prev) => (prev < 100 ? prev + 1 : 100));
    }, 25);
    return () => clearInterval(interval);
  }, []);

  const name = "VIGHNESH GADDAM";

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-[#080808]"
    >
      <div className="flex flex-col items-center">
        {/* 1. Typography Section */}
        <div className="text-center mb-12">
          <motion.h1
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-white text-xl md:text-2xl font-bold tracking-[0.4em] leading-none"
          >
            {name}
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.4 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-[10px] uppercase tracking-[0.25em] text-white mt-4 font-medium"
          >
            Portfolio 2026
          </motion.p>
        </div>

        {/* 2. The Classic Circle (Below) */}
        <div className="relative flex items-center justify-center w-12 h-12">
          {/* Subtle Background Ring */}
          <svg className="absolute inset-0 w-full h-full -rotate-90">
            <circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-white/10"
            />
            {/* Elegant Progress Path */}
            <motion.circle
              cx="24"
              cy="24"
              r="22"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              className="text-white"
              strokeDasharray="138.23" // 2 * PI * 22
              initial={{ strokeDashoffset: 138.23 }}
              animate={{ strokeDashoffset: 138.23 - (138.23 * progress) / 100 }}
              transition={{ ease: "linear" }}
            />
          </svg>

          {/* Percentage Indicator */}
          <span className="text-[9px] font-mono text-white/60 tabular-nums">
            {progress}%
          </span>
        </div>
      </div>
    </motion.div>
  );
};