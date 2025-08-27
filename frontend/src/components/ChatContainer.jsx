import { useChatStore } from "../store/useChatStore";
import { useEffect, useRef } from "react";

import ChatHeader from "./ChatHeader";
import MessageInput from "./MessageInput";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import { useAuthStore } from "../store/useAuthStore";
import { formatMessageTime } from "../lib/utils";

const ChatContainer = () => {
  const {
    messages,
    getMessages,
    isMessagesLoading,
    selectedUser,
    subscribeToMessages,
    unsubscribeFromMessages,
  } = useChatStore();
  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);
    subscribeToMessages();

    return () => unsubscribeFromMessages();
  }, [
    selectedUser._id,
    getMessages,
    subscribeToMessages,
    unsubscribeFromMessages,
  ]);

  useEffect(() => {
    if (messageEndRef.current && messages) {
      messageEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin">
        {messages.map((message, idx) => {
          const isOwn = message.senderId === authUser._id;
          const showAvatar =
            idx === 0 || messages[idx - 1].senderId !== message.senderId;

          return (
            <div
              key={message._id}
              className={`chat ${isOwn ? "chat-end" : "chat-start"} animate-fadeIn`}
              ref={messageEndRef}
            >
              {/* Avatar only if new sender */}
              {showAvatar && (
                <div className="chat-image avatar">
                  <div className="size-9 rounded-full border">
                    <img
                      src={
                        isOwn
                          ? authUser.profilePic || "/avatar.png"
                          : selectedUser.profilePic || "/avatar.png"
                      }
                      alt="profile pic"
                    />
                  </div>
                </div>
              )}

              {/* Message bubble */}
              <div
                className={`chat-bubble px-3 py-2 shadow-sm rounded-2xl ${
                  isOwn
                    ? "bg-primary text-primary-content"
                    : "bg-base-200 text-base-content"
                }`}
              >
                {message.image && (
                  <img
                    src={message.image}
                    alt="Attachment"
                    className="sm:max-w-[220px] rounded-md mb-2 hover:scale-[1.02] transition-transform duration-200"
                  />
                )}
                {message.text && <p className="break-words">{message.text}</p>}

                {/* Timestamp inside bubble */}
                <span className="text-[10px] opacity-60 mt-1 self-end block">
                  {formatMessageTime(message.createdAt)}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Input */}
      <div className="border-t border-base-300 bg-base-100">
        <MessageInput />
      </div>
    </div>
  );
};

export default ChatContainer;
