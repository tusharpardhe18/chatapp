import { useState } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link } from "react-router-dom";
import AuthImagePattern from "../components/AuthImagePattern";
import toast from "react-hot-toast";
import { Loader2 } from "lucide-react";
import { motion } from "framer-motion";

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const { signup, isSigningUp } = useAuthStore();

  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email))
      return toast.error("Invalid email format");
    if (!formData.password.trim()) return toast.error("Password is required");
    if (formData.password.length < 6)
      return toast.error("Password must be at least 6 characters");

    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const success = validateForm();
    if (success === true) signup(formData);
  };

  return (
    <div className="min-h-screen grid bg-gradient-to-br from-indigo-900 via-gray-950 to-indigo-800">
      {/* left side */}
      <div className="flex flex-col justify-center items-center p-6 sm:p-12">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md bg-black/30 backdrop-blur-xl shadow-xl rounded-2xl p-8 space-y-8"
        >
          {/* LOGO */}
          <div className="text-center">
            <div className="flex flex-col items-center gap-2 group">
              <motion.img
                src="https://img.icons8.com/3d-fluency/94/chat.png"
                alt="chat"
                className="w-16 h-16 drop-shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 150 }}
              />
              <h1 className="text-3xl font-extrabold mt-3 bg-gradient-to-r from-indigo-500 to-purple-500 bg-clip-text text-transparent">
                Create Account
              </h1>
              <p className="text-gray-500 mt-1">
                Get started with your free account
              </p>
            </div>
          </div>

          {/* FORM */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Full Name */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400 z-10" />
                <input
                  type="text"
                  className="border-none input input-bordered w-full pl-10 rounded-xl focus:ring-0 transition-all"
                  placeholder="Your Name"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData({ ...formData, fullName: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Email */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">Email</label>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400 z-10" />
                <input
                  type="email"
                  className="border-none input input-bordered w-full pl-10 rounded-xl focus:ring-0 transition-all"
                  placeholder="Your Email Address"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            {/* Password */}
            <div className="form-control">
              <label className="label font-medium text-gray-700">
                Password
              </label>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400 z-10" />
                <input
                  type={showPassword ? "text" : "password"}
                  className="border-none input input-bordered w-full pl-10 rounded-xl focus:ring-0 transition-all"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-3 flex items-center text-gray-400 hover:text-gray-600 transition"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
            </div>

            {/* Submit */}
            <motion.button
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={isSigningUp}
              className="btn btn-primary w-full rounded-xl h-12 font-semibold flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all"
            >
              {isSigningUp ? (
                <>
                  <Loader2 className="animate-spin w-5 h-5" />
                  Creating...
                </>
              ) : (
                "Create Account"
              )}
            </motion.button>
          </form>

          <div className="text-center text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-500 font-medium hover:underline"
            >
              Sign in
            </Link>
          </div>
        </motion.div>
      </div>

      {/* right side */}
      {/* <AuthImagePattern
        title="Join our Community"
        subtitle="Connect with friends, share moments and stay in touch with your loved ones."
      /> */}
    </div>
  );
};

export default SignUpPage;
