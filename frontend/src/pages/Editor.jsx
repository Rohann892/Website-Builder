import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { serverUrl } from "../App";
import { useParams } from "react-router-dom";
import Header from "../components/Header";
import Chat from "../components/Chat";
import { Code2, Monitor, Rocket } from "lucide-react";

const Editor = () => {
  const { id } = useParams();
  const [website, setWebsite] = useState(null);
  const [error, setError] = useState("");
  const [code, setCode] = useState("");
  const [messages, setMessages] = useState("");
  const [prompt, setPrompt] = useState("");
  const [updateLoading, setUpdateLoading] = useState(false);

  const thinkingSteps = [
    "understandig your request",
    "Planning layout changes",
    "Improving responsiveness",
    "Applying animations",
    "Finalizing update",
  ];

  const iframeRef = useRef();

  useEffect(() => {
    const handleGetWebsiteById = async () => {
      try {
        const res = await axios.get(
          `${serverUrl}/api/v1/website/get-by-id/${id}`,
          { withCredentials: true },
        );
        setWebsite(res.data.website);
        setCode(res.data.website.latestCode);
        setMessages(res.data.website.conversation);
        console.log(res.data.website);
      } catch (error) {
        console.log(error);
        setError(error.response?.data?.message || "Something went wrong");
      }
    };
    if (id) {
      handleGetWebsiteById();
    }
  }, [id]);

  useEffect(() => {
    if (!iframeRef.current || !code) return;

    const blob = new Blob([code], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    iframeRef.current.src = url;

    return () => URL.revokeObjectURL(url);
  }, [code]);

  if (error) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-red-400">
        {error}
      </div>
    );
  }

  const handleUpdate = async () => {
    setMessages((m) => [
      ...m,
      {
        role: "user",
        content: prompt,
      },
    ]);

    setUpdateLoading(true);

    setPrompt("");
    try {
      const res = await axios.post(
        `${serverUrl}/api/v1/website/change/${id}`,
        { prompt },
        { withCredentials: true },
      );

      setMessages((prev) => [
        ...prev,
        { role: "ai", content: res.data.message },
      ]);
      setCode(res.data.code);
      setUpdateLoading(false);
    } catch (error) {
      console.log(error);
      setUpdateLoading(false);
    } finally {
      setUpdateLoading(false);
    }
  };

  if (!website) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-green-500">
        Loading....
      </div>
    );
  }
  return (
    <div className="h-screen w-screen flex bg-black text-white overflow-hidden">
      <aside className="w-96 h-full flex flex-col border-r border-white/10">
        <Header website={website} />
        <Chat
          messages={messages}
          prompt={prompt}
          setPrompt={setPrompt}
          handleUpdate={handleUpdate}
          updateLoading={updateLoading}
          thinkingSteps={thinkingSteps}
        />
      </aside>
      {/* website preview */}
      <div className="flex-1 flex flex-col">
        <div className="h-14 px-4 flex justify-between items-center border-b border-white/10 bg-black/80">
          <span className="text-xs text-zinc-400 capitalize">live preview</span>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 px-4 py-1.5 rounded-lg bg-linear-to-r from-indigo-500 to bg-purple-500 text-sm font-semibold hover:scale-105 transition">
              <Rocket size={15} />
              Deploy
            </button>
            <button className="p-2">
              <Code2 size={18} />
            </button>
            <button className="p-2">
              <Monitor size={18} />
            </button>
          </div>
        </div>
        <div className="flex-1 bg-white">
          <iframe
            ref={iframeRef}
            className="w-full h-full border-none"
            title="Preview"
          />
        </div>
      </div>
    </div>
  );
};

export default Editor;
