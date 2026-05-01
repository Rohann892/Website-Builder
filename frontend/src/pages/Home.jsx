import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import LoginModel from "../components/LoginModel";
import { useSelector } from "react-redux";
import { Coins, Plus } from "lucide-react";
import toast from "react-hot-toast";
import { serverUrl } from "../App";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { userData } = useSelector((state) => state.user);
  const highlights = [
    "AI Genearted Code",
    "Fully Responsive Layour",
    "Production Ready Website",
  ];

  const [openLogin, setOpenLogin] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);

  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/v1/auth/logout`, {
        withCredentials: true,
      });
      console.log(res);
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#040404] text-white overflow-hidden">
      <motion.div
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-xl bg-black/40 border-b border-white/10"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <div className="text-lg font-semibold">Apexcraft</div>
          <div className="flex items-center gap-5">
            <div className="hidden md:inline text-sm text-zinc-400 hover:text-white cursor-pointer">
              pricing
            </div>
            {userData && (
              <div className="hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm cursor-pointer hover:bg-white/10">
                <Coins size={20} className="text-yellow-400" />
                <span className="text-zinc-300">Credits</span>
                <span>{userData.credits}</span>
                <span className="font-semibold">
                  <Plus size={15} className="text-white" />
                </span>
              </div>
            )}
            {!userData ? (
              <button
                className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
                onClick={() => setOpenLogin(true)}
              >
                Get Started
              </button>
            ) : (
              <div className="relative">
                <button
                  className="flex items-center"
                  onClick={() => setOpenProfile((prev) => !prev)}
                >
                  <img
                    src={
                      userData.avatar ||
                      `http://ui-avatars.com/api/?name=${userData.name}&background=random`
                    }
                    alt=""
                    className="w-9 h-9 rounded-full border border-white/10 object-cover cursor-pointer"
                  />
                </button>
                <AnimatePresence>
                  {openProfile && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.2 }}
                      className="absolute top-full right-0 mt-3 flex flex-col bg-zinc-900/90 backdrop-blur-xl space-y-1 w-64 p-2 rounded-2xl border border-white/10 shadow-2xl z-50 origin-top-right"
                    >
                      <div className="px-3 py-2 mb-1 border-b border-white/5">
                        <p className="text-sm font-medium text-white truncate">
                          {userData.name}
                        </p>
                        <p className="text-xs text-zinc-500 truncate">
                          {userData.email}
                        </p>
                      </div>

                      <div className="md:hidden p-1">
                        <div className="flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-white/5 border border-white/10 text-sm">
                          <div className="flex items-center gap-2">
                            <Coins size={16} className="text-yellow-400" />
                            <span className="text-zinc-300">Credits</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">
                              {userData.credits}
                            </span>
                            <Plus
                              size={14}
                              className="p-0.5 bg-white text-black rounded-full cursor-pointer hover:bg-zinc-200 transition"
                            />
                          </div>
                        </div>
                      </div>

                      <button
                        className="px-3 py-2 rounded-xl hover:bg-white/5 text-sm text-zinc-300 hover:text-white transition flex items-center gap-2"
                        onClick={() => {
                          navigate("/dashboard");
                          setOpenProfile(false);
                        }}
                      >
                        Dashboard
                      </button>

                      <button
                        className="px-3 py-2 rounded-xl hover:bg-red-500/10 text-sm text-red-400 hover:text-red-300 transition text-left flex items-center gap-2"
                        onClick={() => {
                          handleLogout();
                          setOpenProfile(false);
                        }}
                      >
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <section className="pt-44 pb-32 px-6 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-6xl md:font-bold tracking-tight capitalize mb-4"
        >
          Build stunning websites <br />{" "}
          <span className="bg-linear-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            with AI
          </span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg text-zinc-400 max-w-2xl mx-auto mt-8"
        >
          Describe your idea and let AI generate a modern responsive
          production-ready website in seconds
        </motion.p>
        <button
          className="px-10 py-4 rounded-xl bg-white text-black font-semibold hover:scale-105 transition mt-12"
          onClick={() => navigate("/generate")}
        >
          {!userData ? "Get Started" : "Go to Dashboard"}
        </button>
      </section>

      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {highlights.map((h, i) => (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2 }}
              key={i}
              className="rounded-2xl bg-white/5 border border-white/10 p-5"
            >
              <h1 className="text-xl font-semibold mb-3 text-white">{h}</h1>
              <p className="text-sm text-zinc-400">
                Website Builder builds real websites with clean well structued
                and production ready code
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      <footer
        className="border-t border-white/10 py-10 text-center
       text-sm text-zinc-400"
      >
        &copy; {new Date().getFullYear()} Website Builder
      </footer>

      {openLogin && (
        <LoginModel open={openLogin} onClose={() => setOpenLogin(false)} />
      )}
    </div>
  );
};

export default Home;
