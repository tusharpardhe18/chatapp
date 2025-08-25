// components/AuthImagePattern.jsx
import { motion } from "framer-motion";

const AuthImagePattern = ({ title, subtitle }) => {
  return (
    <div className="relative hidden lg:flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 overflow-hidden">

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />

      {/* Floating circles for depth */}
      <motion.div
        className="absolute top-10 left-10 w-24 h-24 bg-white/20 rounded-full blur-2xl"
        animate={{ y: [0, 30, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-20 right-20 w-32 h-32 bg-white/10 rounded-full blur-3xl"
        animate={{ y: [0, -40, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Text content */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center px-10"
      >
        <h2 className="text-4xl font-extrabold text-white drop-shadow-lg">
          {title}
        </h2>
        <p className="mt-4 text-lg text-gray-200 max-w-md mx-auto leading-relaxed">
          {subtitle}
        </p>
      </motion.div>
    </div>
  );
};

export default AuthImagePattern;
