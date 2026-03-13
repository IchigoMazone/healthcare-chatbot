// "use client";
// import { useParams } from "next/navigation";
// import { Plus, Settings2, AudioLines } from "lucide-react";
// import { useState, useRef, useEffect } from "react";

// type Message = {
//   id: number;
//   role: "user" | "assistant";
//   content: string;
// };

// const mockMessages: Message[] = Array.from({ length: 15 }, (_, i) => [
//   {
//     id: i * 2,
//     role: "user" as const,
//     content: "Xin chào thế giới... Hôm nay bạn khỏe chứ",
//   },
//   {
//     id: i * 2 + 1,
//     role: "assistant" as const,
//     content: "Có vẻ như bàn phím của bạn đang bị ép cung. Cần giúp gì không?",
//   },
// ]).flat();

// export default function ChatPage() {
//   const { id } = useParams();
//   const [messages, setMessages] = useState<Message[]>(mockMessages);
//   const [input, setInput] = useState("");
//   const textareaRef = useRef<HTMLTextAreaElement>(null);
//   const messagesEndRef = useRef<HTMLDivElement>(null);

//   useEffect(() => {
//     messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
//   }, [messages]);

//   const handleSend = () => {
//     if (!input.trim()) return;
//     setMessages((prev) => [
//       ...prev,
//       { id: Date.now(), role: "user", content: input },
//     ]);
//     setInput("");

//     if (textareaRef.current) {
//       textareaRef.current.style.height = "auto";
//     }

//     setTimeout(() => {
//       setMessages((prev) => [
//         ...prev,
//         {
//           id: Date.now() + 1,
//           role: "assistant",
//           content: "Đang xử lý câu hỏi của bạn...",
//         },
//       ]);
//     }, 800);
//   };

//   return (
//     <div className="w-full h-full flex flex-col">
//       {/* Messages */}
//       <div className="flex-1 min-h-0 overflow-y-auto flex justify-center">
//         <div className="w-full mx-5 sm:mx-0 sm:w-[80%] lg:w-[65%] xl:w-[55%] flex flex-col gap-4 py-5">
//           {messages.map((msg) => (
//             <div
//               key={msg.id}
//               className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
//             >
//               <div
//                 className={`p-3 max-w-[75%] break-words rounded-[10px] ${
//                   msg.role === "user" ? "bg-[#f0eee6]" : ""
//                 }`}
//               >
//                 {msg.content}
//               </div>
//             </div>
//           ))}
//           <div ref={messagesEndRef} />
//         </div>
//       </div>

//       {/* Input */}
//       <div className="w-full flex justify-center px-5 sm:px-0 mb-5">
//         <div className="w-full sm:w-[80%] lg:w-[65%] xl:w-[55%] border border-[#d7d7d2] rounded-[30px] sm:rounded-[18px] bg-white shadow-lg flex flex-col p-1">
//           <div className="flex items-center mt-2 py-2 mx-1">
//             <textarea
//               ref={textareaRef}
//               value={input}
//               placeholder="Hỏi đáp về bệnh viện X"
//               rows={1}
//               className="w-full md:text-[16px] px-4 outline-none resize-none overflow-hidden"
//               onChange={(e) => setInput(e.target.value)}
//               onKeyDown={(e) => {
//                 if (e.key === "Enter" && !e.shiftKey) {
//                   e.preventDefault();
//                   handleSend();
//                 }
//               }}
//               onInput={(e) => {
//                 const el = e.target as HTMLTextAreaElement;
//                 el.style.height = "auto";
//                 el.style.height = el.scrollHeight + "px";
//               }}
//             />
//           </div>
//           <div className="grid grid-cols-6 pb-2 sm:pb-4">
//             <div className="flex justify-center items-center">
//               <Plus strokeWidth="1.6" className="w-6 h-6" />
//             </div>
//             <div className="col-start-5 flex justify-center items-center">
//               <Settings2 strokeWidth="1.6" className="w-6 h-6" />
//             </div>
//             <div
//               className="col-start-6 flex justify-center items-center cursor-pointer"
//               onClick={handleSend}
//             >
//               <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-200">
//                 <AudioLines strokeWidth="1.6" className="w-6 h-6" />
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useParams } from "next/navigation";
import { Plus, Settings2, AudioLines, ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const mockMessages: Message[] = Array.from({ length: 15 }, (_, i) => [
  {
    id: i * 2,
    role: "user" as const,
    content: "Xin chào thế giới... Hôm nay bạn khỏe chứ",
  },
  {
    id: i * 2 + 1,
    role: "assistant" as const,
    content: "Có vẻ như bàn phím của bạn đang bị ép cung. Cần giúp gì không?",
  },
]).flat();

export default function ChatPage() {
  const { id } = useParams();
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [input, setInput] = useState("");
  const [showScrollBtn, setShowScrollBtn] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const isNearBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 100;
    setShowScrollBtn(!isNearBottom);
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), role: "user", content: input },
    ]);
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content: "Đang xử lý câu hỏi của bạn...",
        },
      ]);
    }, 800);
  };

  return (
    <div className="w-full h-full flex flex-col relative">
      {/* Messages */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 min-h-0 overflow-y-auto flex justify-center"
      >
        <div className="w-full mx-5 sm:mx-0 sm:w-[80%] lg:w-[65%] xl:w-[55%] flex flex-col gap-4 py-5">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`p-3 max-w-[75%] break-words rounded-[10px] sm:mt-15 ${
                  msg.role === "user" ? "bg-[#f0eee6]" : ""
                }`}
              >
                {msg.content}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Scroll to bottom button */}
      {showScrollBtn && (
        <button
          onClick={scrollToBottom}
          className="absolute bottom-28 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white border border-[#d7d7d2] shadow-md flex justify-center items-center hover:bg-gray-100 cursor-pointer z-10"
        >
          <ChevronDown strokeWidth="1.6" className="w-5 h-5" />
        </button>
      )}

      {/* Input */}
      <div className="w-full flex justify-center px-5 sm:px-0 mb-5">
        <div className="w-full sm:w-[80%] lg:w-[65%] xl:w-[55%] border border-[#d7d7d2] rounded-[30px] sm:rounded-[18px] bg-white shadow-lg flex flex-col p-1">
          <div className="flex items-center mt-2 py-2 mx-1">
            <textarea
              ref={textareaRef}
              value={input}
              placeholder="Hỏi đáp về bệnh viện X"
              rows={1}
              className="w-full md:text-[16px] px-4 outline-none resize-none overflow-hidden"
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSend();
                }
              }}
              onInput={(e) => {
                const el = e.target as HTMLTextAreaElement;
                el.style.height = "auto";
                el.style.height = el.scrollHeight + "px";
              }}
            />
          </div>
          <div className="grid grid-cols-6 pb-2 sm:pb-4">
            <div className="flex justify-center items-center">
              <Plus strokeWidth="1.6" className="w-6 h-6" />
            </div>
            <div className="col-start-5 flex justify-center items-center">
              <Settings2 strokeWidth="1.6" className="w-6 h-6" />
            </div>
            <div
              className="col-start-6 flex justify-center items-center cursor-pointer"
              onClick={handleSend}
            >
              <div className="w-8 h-8 rounded-full flex justify-center items-center hover:bg-gray-200">
                <AudioLines strokeWidth="1.6" className="w-6 h-6" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
