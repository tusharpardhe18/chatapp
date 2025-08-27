import { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import SidebarSkeleton from "./skeletons/SidebarSkeleton";
import { Users, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Sidebar = () => {
  const { getUsers, users, selectedUser, setSelectedUser, isUsersLoading } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineOnly, setShowOnlineOnly] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // drawer state

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  const filteredUsers = showOnlineOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  if (isUsersLoading) return <SidebarSkeleton />;

  return (
    <>
      {/* Mobile toggle button */}
      <div className="lg:hidden fixed top-4 left-4 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 bg-base-100 rounded-full shadow-md hover:bg-base-200 transition"
        >
          {isOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Sidebar - desktop always visible */}
      <aside className="hidden lg:flex h-full w-72 border-r border-base-300 flex-col bg-base-100/80 backdrop-blur-xl">
        <SidebarContent
          filteredUsers={filteredUsers}
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
          onlineUsers={onlineUsers}
          showOnlineOnly={showOnlineOnly}
          setShowOnlineOnly={setShowOnlineOnly}
        />
      </aside>

      {/* Sidebar - mobile drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ duration: 0.25 }}
            className="fixed top-0 left-0 h-full w-64 bg-base-100/95 backdrop-blur-xl border-r border-base-300 z-40 flex flex-col"
          >
            <SidebarContent
              filteredUsers={filteredUsers}
              selectedUser={selectedUser}
              setSelectedUser={(user) => {
                setSelectedUser(user);
                setIsOpen(false); // auto-close on select
              }}
              onlineUsers={onlineUsers}
              showOnlineOnly={showOnlineOnly}
              setShowOnlineOnly={setShowOnlineOnly}
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
};

// Extracted Sidebar content for reuse
const SidebarContent = ({
  filteredUsers,
  selectedUser,
  setSelectedUser,
  onlineUsers,
  showOnlineOnly,
  setShowOnlineOnly,
}) => {
  return (
    <>
      {/* Header */}
      <div className="border-b border-base-300 w-full p-5">
        <div className="flex items-center justify-between lg:justify-start gap-2">
          <Users className="size-6 text-primary" />
          <span className="font-semibold hidden lg:block">Contacts</span>

          {/* Online counter pill */}
          <span className="hidden lg:inline-block text-xs px-2 py-0.5 rounded-full bg-gradient-to-r from-green-500 to-emerald-600 text-white">
            {onlineUsers.length - 1} online
          </span>
        </div>

        {/* Online-only filter */}
        <div className="mt-3 hidden lg:flex items-center gap-2 text-sm">
          <label className="cursor-pointer flex items-center gap-2">
            <input
              type="checkbox"
              checked={showOnlineOnly}
              onChange={(e) => setShowOnlineOnly(e.target.checked)}
              className="checkbox checkbox-sm"
            />
            Show online only
          </label>
        </div>
      </div>

      {/* Users list */}
      <div className="overflow-y-auto w-full py-3 scrollbar-thin scrollbar-thumb-base-300 scrollbar-track-transparent">
        {filteredUsers.map((user) => (
          <motion.button
            key={user._id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => setSelectedUser(user)}
            className={`w-full p-3 flex items-center gap-3 transition-all rounded-lg
              ${
                selectedUser?._id === user._id
                  ? "bg-gradient-to-r from-primary/20 to-accent/20 ring-2 ring-primary/40"
                  : "hover:bg-base-200"
              }
            `}
          >
            {/* Avatar */}
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePic || "/avatar.png"}
                alt={user.name}
                className="size-12 object-cover rounded-full shadow-md"
              />
              {onlineUsers.includes(user._id) && (
                <span className="absolute bottom-0 right-0 size-3 bg-green-500 rounded-full ring-2 ring-base-100" />
              )}
            </div>

            {/* User info */}
            <div className="hidden lg:block text-left min-w-0">
              <div className="font-medium truncate">{user.fullName}</div>
              <div
                className={`text-sm ${
                  onlineUsers.includes(user._id)
                    ? "text-green-500 font-medium"
                    : "text-zinc-400"
                }`}
              >
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </motion.button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4 text-sm">
            No online users
          </div>
        )}
      </div>
    </>
  );
};

export default Sidebar;
