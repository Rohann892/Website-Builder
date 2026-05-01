import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import { useSelector } from "react-redux";

const Dashboard = () => {
  const { userData } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/50 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-1">
            <button
              className="p-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
              onClick={() => navigate("/")}
            >
              <ArrowLeft size={15} className="text-zinc-400" />
            </button>
            <h1 className="text-sm font-semibold text-zinc-500">Dashboard</h1>
          </div>
          <button
            className="px-4 py-2 rounded-lg bg-white text-black text-sm font-semibold hover:scale-105 transition cursor-pointer"
            onClick={() => navigate("/generate")}
          >
            New Website
          </button>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-10"
        >
          <p className="text-sm text-zinc-400 mb-1 ">Welcome Back</p>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
