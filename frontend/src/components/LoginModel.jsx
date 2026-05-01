import { signInWithPopup } from "firebase/auth";
import { AnimatePresence, motion } from "motion/react";
import { FcGoogle } from "react-icons/fc";
import { auth, provider } from "../firebase";
import axios from "axios";
import { serverUrl } from "../App";
import toast from "react-hot-toast";

const LoginModel = ({ open, onClose }) => {
  const handleGoogleAuth = async () => {
    try {
      const res = await signInWithPopup(auth, provider);
      const { data } = await axios.post(
        `${serverUrl}/api/v1/auth/google-auth`,
        {
          name: res.user.displayName,
          email: res.user.email,
          avatar: res.user.photoURL,
        },
        { withCredentials: true },
      );
      console.log(data);
      if (data.success) {
        toast.success(data.message);
      }
      onClose();
      window.location.reload();
    } catch (error) {
      console.error("Auth process failed:", error);
      alert(
        "Login failed: " + (error.response?.data?.message || error.message),
      );
    }
  };
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-100 flex items-center justify-center backdrop-blur-xl px-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={onClose}
        >
          <motion.div
            className="relative w-full max-w-md p-[1px] rounded-3xl bg-gradient-to-br from-purple-500/40 via-blue-500/300 to-transparent"
            initial={{ scale: 0.88, y: 60, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.9, y: 40, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-3xl bg-[#0b0b0b] border border-white/10 shadow-[0_30px_120px_rgba(0,0,0,0.8] overflow-hidden">
              <motion.div
                initial={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity }}
                className="absolute -top-32 -left-32 w-80 h-80 bg-purple-500/30 blur-[140px]"
              />
              <motion.div
                initial={{ opacity: [0.25, 0.4, 0.25] }}
                transition={{ duration: 6, repeat: Infinity, delay: 2 }}
                className="absolute top-32 -right-32 w-80 h-80 bg-blue-500/30 blur-[140px]"
              />
              <button
                className="absolute top-5 right-5 z-20 text-zinc-500 hover:text-white/80"
                onClick={onClose}
              >
                X
              </button>
              <div className="relative px-8 pt-14 pb-10 text-center flex flex-col items-center justify-center">
                <h1 className="inline-block mb-6 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-zinc-400">
                  AI Powered Website Builder
                </h1>
                <h2 className="text-3xl font-semibold leading-tight text-white mb-8">
                  Welcome to{" "}
                  <span className="bg-linear-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                    Apexcraft
                  </span>
                </h2>
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 1.1 }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-white text-black font-semibold hover:bg-white/90 transition cursor-pointer"
                  onClick={handleGoogleAuth}
                >
                  <FcGoogle size={30} />
                  Continue with Google
                </motion.button>

                <div className="w-full flex items-center gap-4 my-10">
                  <div className="h-px flex-1 bg-white/10" />
                  <span className="text-xs text-zinc-500 tracking-tight">
                    Secure Login
                  </span>
                  <div className="h-px flex-1 bg-white/10" />
                </div>

                <p className="text-xs text-zinc-500 leading-relaxed">
                  By continuing, you agree to our{" "}
                  <span className="undeline cursor-pointer hover:text-blue-300">
                    Terms of Service
                  </span>{" "}
                  and{" "}
                  <span className="undeline cursor-pointer hover:text-blue-300">
                    Privacy Policy
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginModel;
