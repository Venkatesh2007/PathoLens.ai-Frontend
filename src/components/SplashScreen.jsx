import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function SplashScreen({ finishLoading }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(finishLoading, 500); // Delay to match animation exit
        }, 2500); // Show for 2.5s
        return () => clearTimeout(timer);
    }, [finishLoading]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 text-white z-50"
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* Animated Logo */}
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="text-6xl font-extrabold tracking-widest drop-shadow-lg"
                    >
                        🚀 MyApp
                    </motion.div>

                    {/* Animated Subtext */}
                    <motion.p
                        initial={{ y: 50, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: 0.8, duration: 0.7 }}
                        className="mt-4 text-lg font-medium tracking-wider"
                    >
                        Loading your experience...
                    </motion.p>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
