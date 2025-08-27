import { useChatStore } from "../store/useChatStore";
import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";
import { motion, AnimatePresence } from "framer-motion";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-gradient-to-br from-base-200 via-base-300 to-base-200">
      <div className="flex items-center justify-center pt-20 px-4">
        {/* Main Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="bg-base-100/80 backdrop-blur-xl rounded-2xl shadow-xl border border-base-300 w-full max-w-6xl h-[calc(100vh-8rem)]"
        >
          {/* Subtle top gradient strip */}
          <div className="h-1 bg-gradient-to-r from-primary to-accent rounded-t-2xl" />

          {/* Layout */}
          <div className="flex h-full rounded-b-2xl overflow-hidden">
            {/* Sidebar with slide-in */}
            <motion.div
              initial={{ x: -50, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="hidden sm:block"
            >
              <Sidebar />
            </motion.div>

            {/* Animate Chat section */}
            <AnimatePresence mode="wait">
              {!selectedUser ? (
                <motion.div
                  key="no-chat"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1 flex items-center justify-center"
                >
                  <NoChatSelected />
                </motion.div>
              ) : (
                <motion.div
                  key="chat"
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.3 }}
                  className="flex-1"
                >
                  <ChatContainer />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HomePage;
