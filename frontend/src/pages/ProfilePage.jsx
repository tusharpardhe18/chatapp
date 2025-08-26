import { useAuthStore } from "../store/useAuthStore";
import { Camera } from "lucide-react";
import { useState } from "react";
import { FaEnvelope, FaUser } from "react-icons/fa";
import { motion } from "framer-motion";

const ProfilePage = () => {
  const { authUser, isUpdatingProfile, updateProfile } = useAuthStore();
  const [selectedImg, setSelectedImg] = useState(null);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImg(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <motion.div
      className="h-screen pt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="max-w-2xl mx-auto p-4 py-8">
        <motion.div
          className="bg-base-300 rounded-xl p-6 space-y-8 shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          {/* Header */}
          <div className="text-center">
            <motion.h1
              className="text-2xl font-semibold"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Profile
            </motion.h1>
            <p className="mt-2 text-base-content/70">Your profile information</p>
          </div>

          {/* Avatar upload */}
          <div className="flex flex-col items-center gap-4">
            <motion.div
              className="relative"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 200 }}
            >
              <motion.img
                src={selectedImg || authUser.profilePic || "/avatar.jpg"}
                alt="Profile"
                className="size-32 rounded-full object-cover border-4 border-base-200 shadow-md"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <label
                htmlFor="avatar-upload"
                className={`absolute bottom-0 right-0 bg-base-content hover:scale-105 p-2 rounded-full cursor-pointer transition-all duration-200 ${
                  isUpdatingProfile ? "animate-pulse pointer-events-auto" : ""
                }`}
              >
                <Camera className="w-5 h-5 text-base-200" />
                <input
                  type="file"
                  id="avatar-upload"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImageUpload}
                  disabled={isUpdatingProfile}
                />
              </label>
            </motion.div>
            <p className="text-sm text-base-content/70">
              {isUpdatingProfile
                ? "Uploading..."
                : "Click the camera icon to update your profile picture"}
            </p>
          </div>

          {/* User Info */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <FaUser className="w-4 h-4" />
                Full Name
              </div>
              <p className="px-4 py-2.5 bg-base-100 rounded-lg shadow-sm">
                {authUser?.fullName}
              </p>
            </div>

            <div className="space-y-1.5">
              <div className="text-sm text-zinc-400 flex items-center gap-2">
                <FaEnvelope className="w-4 h-4" />
                Email Address
              </div>
              <p className="px-4 py-2.5 bg-base-100 rounded-lg shadow-sm">
                {authUser?.email}
              </p>
            </div>
          </motion.div>

          {/* Account Info */}
          <motion.div
            className="mt-6 bg-base-100 rounded-xl p-6 border border-base-200"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <h2 className="text-lg font-medium mb-4">Account Information</h2>
            <div className="text-sm">
              <div className="flex items-center justify-between py-2 border-b border-zinc-700">
                <span>Member Since</span>
                <span>{authUser.createdAt?.split("T")[0]}</span>
              </div>
              <div className="flex items-center justify-between py-2">
                <span>Account Status</span>
                <motion.span
                  className="text-green-500"
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.5 }}
                >
                  Active
                </motion.span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
