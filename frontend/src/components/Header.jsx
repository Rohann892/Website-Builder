import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Header = ({ website }) => {
  const navigate = useNavigate();
  return (
    <div className="h-14 px-4 flex items-center gap-3 border-b border-white/10">
      <button
        onClick={() => navigate("/")}
        className="p-2 hover:bg-white/5 rounded-lg transition cursor-pointer"
      >
        <ArrowLeft size={16} className="text-zinc-400" />
      </button>
      <span className="font-semibold truncate capitalize text-sm">
        {website?.title}
      </span>
    </div>
  );
};

export default Header;
