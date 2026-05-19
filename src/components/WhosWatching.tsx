import { motion } from "framer-motion";
import { useState } from "react";

export default function WhosWatching({ onSelect }: { onSelect: () => void }) {
  const [clicked, setClicked] = useState(false);

  const handleSelect = () => {
    setClicked(true);
    // Play the Netflix Ta-Dum sound if we had it, but we can simulate the timing
    setTimeout(() => {
      onSelect();
    }, 1500); // 1.5 seconds for the cinematic transition
  };

  return (
    <motion.div
      className="fixed inset-0 bg-[#141414] z-[99999] flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      animate={{ opacity: clicked ? 0 : 1, scale: clicked ? 1.1 : 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    >
      {!clicked && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center"
        >
          <h1 className="font-display text-3xl sm:text-5xl text-white mb-10">Who's watching?</h1>
          
          <div className="flex justify-center gap-6 sm:gap-10">
            {/* Main Profile */}
            <motion.div 
              className="flex flex-col items-center group cursor-pointer"
              onClick={handleSelect}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-md overflow-hidden border-[3px] border-transparent group-hover:border-white transition-colors duration-300 shadow-2xl relative">
                {/* We can use the first talk photo as her profile pic or a generic cute avatar */}
                <img src="/assets/photos/profile.jpeg" alt="My Bulbul" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>
              <p className="mt-4 text-white/60 group-hover:text-white font-semibold transition-colors">My Bulbul</p>
            </motion.div>

            {/* Guest Profile (Optional, just for aesthetics) */}
            <motion.div 
              className="flex flex-col items-center group cursor-pointer opacity-50 hover:opacity-100 transition-opacity"
              whileHover={{ scale: 1.05 }}
            >
              <div className="w-24 h-24 sm:w-36 sm:h-36 rounded-md overflow-hidden bg-[#333] border-[3px] border-transparent group-hover:border-white transition-colors duration-300 flex items-center justify-center">
                <span className="text-4xl">👨‍💻</span>
              </div>
              <p className="mt-4 text-white/60 group-hover:text-white font-semibold transition-colors">The Boyfriend</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
