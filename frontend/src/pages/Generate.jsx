import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useState } from "react";
import { serverUrl } from "../App.jsx";
import axios from "axios";
import toast from "react-hot-toast";

const Generate = () => {
  const navigate = useNavigate();

  const [prompt, setPrompt] = useState("");

  const handleGenerateWebsite = async () => {
    try {
      const { data } = await axios.post(
        `${serverUrl}/api/v1/website/generate`,
        { prompt },
        { withCredentials: true },
      );
      setPrompt("");
      console.log(data);
      toast.success("Website generated!");
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "Failed to generate");
    }
  };
  return (
    <div className="min-h-screen bg-linear-to-br from-[#050505] to via-[#0b0b0b] to-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={15} className="text-zinc-400" />
            </button>
            <h1 className="text-sm font-semibold text-zinc-500">Apexcraft</h1>
          </div>
        </div>
      </div>

      {/* content area */}
      <div className="max-w-6xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold mb-5 leading-tight">
            Build Website with
            <span className="block bg-linear-to-r form white to-zinc-300 bg-clip-text text-transparent">
              Real Ai Power
            </span>
          </h1>
          <p className="text-zinc-400 max-w-2xl mx-auto">
            This process takes several mintues. Apexcraft focuses on quality,
            not shortcuts
          </p>
        </motion.div>

        {/* prompt area */}
        <div className="mb-10">
          <h1 className="text-2xl font-semibold mb-2">Describe your Website</h1>
          <div className="relative">
            <textarea
              name=""
              id=""
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Describe your website in details..."
              className="w-full h-56 p-6 rounded-3xl bg-black/60 border border-white/10 outline-none resize-none text-sm leading-relaxed focus-ring-2 focus-ring-white/20"
            ></textarea>
          </div>
        </div>

        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.09 }}
            whileTap={{ scale: 1.02 }}
            className="px-14 py-4 rounded-2xl font-semibold text-lg bg-white text-black cursor-pointer"
            onClick={() => handleGenerateWebsite()}
          >
            Generate Website
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Generate;
