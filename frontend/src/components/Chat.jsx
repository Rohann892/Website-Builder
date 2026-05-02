import { Loader, Send } from "lucide-react";

const Chat = ({
  messages,
  prompt,
  setPrompt,
  handleUpdate,
  updateLoading,
  thinkingSteps,
}) => {
  return (
    <>
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages?.map((m, i) => (
          <div
            key={i}
            className={`max-w-[85%] ${m.role === "user" ? "ml-auto bg-white text-black p-2 rounded-tr-2xl rounded-bl-2xl" : "bg-white/5 border border-white/10 p-2 mr-auto rounded-tl-2xl rounded-br-2xl"}`}
          >
            {updateLoading ? (
              <div className="space-y-2">
                <p>{thinkingSteps[i]}</p>
                <div className="space-y-1">
                  {[1, 2, 3].map((_, j) => (
                    <div
                      key={j}
                      className="w-full h-2 bg-white/10 rounded animate-pulse"
                    ></div>
                  ))}
                </div>
              </div>
            ) : (
              m.content
            )}
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-white/10">
        <div className="flex gap-2">
          <textarea
            name=""
            id=""
            row="1"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe changes....."
            className="flex-1 resize-none rounded-2xl px-4 py-3 bg-white/5 border-white/10 text-sm outline-none"
          ></textarea>
          <button
            className="px-4 py-2 rounded-2xl bg-white text-black"
            onClick={() => handleUpdate()}
            disabled={updateLoading}
          >
            {updateLoading ? (
              <Loader className="animate-spin" size={15} />
            ) : (
              <Send size={15} />
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chat;
