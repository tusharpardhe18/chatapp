const NoChatSelected = () => {
  return (
    <div className="w-full flex flex-1 flex-col items-center justify-center p-10 
      bg-gradient-to-br from-base-100 via-base-200 to-base-100">
      
      <div className="max-w-md text-center space-y-6 p-8 rounded-2xl bg-base-100/70 
        backdrop-blur-xl shadow-md border border-base-200">
        
        {/* Icon Display */}
        <div className="flex justify-center gap-4 mb-6">
          <div className="relative group">
            <div
              className="w-20 h-20 rounded-2xl flex items-center justify-center 
              animate-pulse bg-base-200/70 shadow-inner"
            >
              <img
                src="https://img.icons8.com/3d-fluency/94/chat.png"
                alt="chat"
                className="w-16 h-16 drop-shadow-lg group-hover:scale-110 transition-transform duration-300"
              />
            </div>
          </div>
        </div>

        {/* Welcome Text */}
        <h2 className="text-2xl font-bold text-base-content">
          Welcome to <span className="text-primary">Chatty</span>!
        </h2>
        <p className="text-base-content/70">
          Select a conversation from the sidebar or start a new one to begin chatting.
        </p>

        {/* CTA */}
        <button className="mt-4 px-4 py-2 rounded-xl bg-primary text-white font-medium shadow hover:shadow-lg hover:scale-105 transition">
          Start a New Chat
        </button>
      </div>
    </div>
  );
};

export default NoChatSelected;
