import { motion } from "motion/react";
import { useState } from "react";
import LoginModel from "../components/LoginModel";

const Home = () => {
  const highlights = [
    "AI Genearted Code",
    "Fully Responsive Layour",
    "Production Ready Website",
  ];

  const [openLogin, setOpenLogin] = useState(false);

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
            <button
              className="px-4 py-2 rounded-lg border border-white/20 hover:bg-white/10 text-sm"
              onClick={() => setOpenLogin(true)}
            >
              Get Started
            </button>
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
          onClick={() => setOpenLogin(true)}
        >
          Get Started
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
