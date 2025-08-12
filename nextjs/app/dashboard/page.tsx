"use client";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type Chat = {
  id: number;
  name: string;
  preview: string;
  time: string;
  unread?: number;
  initials: string;
};

export default function Dashboard() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeChat, setActiveChat] = useState<number>(1);

  const chats: Chat[] = [
    { id: 1, name: "Alice Murphy", preview: "Hey! How's the project going?", time: "2:30 PM", unread: 2, initials: "AM" },
    { id: 2, name: "John Doe", preview: "Thanks for the quick response!", time: "1:15 PM", initials: "JD" },
    { id: 3, name: "Sarah Chen", preview: "Can we schedule a meeting?", time: "12:45 PM", unread: 1, initials: "SC" },
    { id: 4, name: "Mike Wilson", preview: "The files have been uploaded", time: "11:30 AM", initials: "MW" },
    { id: 5, name: "Lisa Rodriguez", preview: "Great work on the presentation!", time: "Yesterday", initials: "LR" },
    { id: 6, name: "Team Bot", preview: "Daily standup reminder", time: "Yesterday", initials: "TB" },
  ];
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) {
        router.push("/");
      } else {
        setLoading(false);
      }
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      if (!session) {
        router.push("/");
      }
    });

    return () => authListener?.subscription.unsubscribe();
  }, [router]);

  if (loading) return null;

  return (
    
    <>
      <style>{`
        /* Scrollbars */
        .chat-list::-webkit-scrollbar, .chat-messages::-webkit-scrollbar { width: 6px; height:6px; }
        .chat-list::-webkit-scrollbar-thumb, .chat-messages::-webkit-scrollbar-thumb { background: #5a4a7a; border-radius: 3px; }
        .chat-list::-webkit-scrollbar-track, .chat-messages::-webkit-scrollbar-track { background: rgba(40,40,60,0.45); }

        /* Mobile sidebar slide */
        @media (max-width: 768px) {
          .sidebar-mobile { position: fixed; top: 0; left: 0; height: 100vh; z-index: 50; transform: translateX(-110%); transition: transform 280ms ease; width: 80%; max-width: 320px; }
          .sidebar-mobile.open { transform: translateX(0%); }
        }
      `}</style>

      <div className="flex h-screen bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f23] font-sans text-sm">
        {/* Desktop Sidebar */}
        <aside className="hidden md:flex md:w-72 bg-[rgba(25,25,45,0.95)] border-r-2 border-[#5a4a7a] flex-col backdrop-blur-sm">
          <div className="p-5 border-b border-[#5a4a7a] bg-[rgba(35,35,55,0.8)]">
            <h2 className="text-white text-lg font-semibold mb-1">Messages</h2>
            <div className="flex items-center gap-2 mt-2">
              <div className="w-2 h-2 rounded-full bg-emerald-400" />
              <span className="text-[#b0b0c0] text-xs">Online</span>
            </div>
          </div>

          <div className="p-4 border-b border-[#5a4a7a]">
            <input
              type="text"
              placeholder="Search conversations..."
              className="w-full px-4 py-2 bg-[rgba(40,40,60,0.8)] border-2 border-[#5a4a7a] rounded-full text-white placeholder-[#9a9ab0] focus:outline-none focus:border-[#7a6aa0] transition"
            />
          </div>

          <div className="flex-1 overflow-y-auto chat-list">
            {chats.map((c) => (
              <button
                key={c.id}
                onClick={() => setActiveChat(c.id)}
                className={
                  "w-full text-left flex items-center px-5 py-3 cursor-pointer border-l-4 " +
                  (activeChat === c.id
                    ? "bg-[rgba(122,106,160,0.18)] border-[#7a6aa0]"
                    : "border-transparent hover:bg-[rgba(45,45,65,0.7)] hover:border-[#7a6aa0]")
                }
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] flex items-center justify-center text-white font-semibold mr-3 border-2 border-[#5a4a7a]">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{c.name}</div>
                  <div className="text-[#9a9ab0] text-xs truncate">{c.preview}</div>
                </div>
                <div className="text-right ml-3">
                  <div className="text-[#7a7a8a] text-[11px] mb-1">{c.time}</div>
                  {c.unread ? (
                    <div className="inline-block bg-[#7a6aa0] text-white text-[10px] font-semibold rounded-full px-2 py-0.5">
                      {c.unread}
                    </div>
                  ) : null}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Mobile Sidebar */}
        <aside
          className={`sidebar-mobile md:hidden bg-[rgba(25,25,45,0.98)] border-r-2 border-[#5a4a7a] flex flex-col p-4 ${mobileOpen ? "open" : ""
            }`}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-white text-lg font-semibold">Messages</h2>
            <button
              aria-label="Close sidebar"
              onClick={() => setMobileOpen(false)}
              className="text-[#b0b0c0] px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.03)]"
            >
              Close
            </button>
          </div>

          <div className="mb-4">
            <input
              type="text"
              placeholder="Search..."
              className="w-full px-4 py-2 bg-[rgba(40,40,60,0.8)] border-2 border-[#5a4a7a] rounded-full text-white placeholder-[#9a9ab0] focus:outline-none focus:border-[#7a6aa0] transition"
            />
          </div>

          <div className="flex-1 overflow-y-auto">
            {chats.map((c) => (
              <button
                key={c.id}
                onClick={() => {
                  setActiveChat(c.id);
                  setMobileOpen(false);
                }}
                className={
                  "w-full text-left flex items-center px-3 py-3 rounded-md mb-1 " +
                  (activeChat === c.id ? "bg-[rgba(122,106,160,0.12)]" : "hover:bg-[rgba(255,255,255,0.02)]")
                }
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] flex items-center justify-center text-white font-semibold mr-3 border-2 border-[#5a4a7a]">
                  {c.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium text-sm truncate">{c.name}</div>
                  <div className="text-[#9a9ab0] text-xs truncate">{c.preview}</div>
                </div>
                <div className="text-right ml-2">
                  <div className="text-[#7a7a8a] text-[11px]">{c.time}</div>
                  {c.unread ? <div className="text-[#7a6aa0] text-xs font-semibold">{c.unread}</div> : null}
                </div>
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 flex flex-col bg-[rgba(20,20,40,0.85)]">
          <header className="flex items-center justify-between p-4 md:p-5 border-b-2 border-[#5a4a7a] bg-[rgba(35,35,55,0.92)]">
            <div className="flex items-center gap-3">
              <button
                className="md:hidden text-[#b0b0c0] px-2 py-1 rounded hover:bg-[rgba(255,255,255,0.03)]"
                aria-label="Open sidebar"
                onClick={() => setMobileOpen(true)}
              >
                Menu
              </button>

              <div className="w-11 h-11 rounded-full bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] flex items-center justify-center text-white font-semibold border-2 border-[#5a4a7a]">
                {chats.find((c) => c.id === activeChat)?.initials ?? "?"}
              </div>

              <div>
                <h3 className="text-white text-lg font-semibold leading-tight">
                  {chats.find((c) => c.id === activeChat)?.name ?? "Select a chat"}
                </h3>
                <p className="text-emerald-400 text-xs">
                  {activeChat ? "Online now" : "Offline"}
                </p>
              </div>
            </div>

            <div className="hidden md:flex gap-2">
              <button className="px-3 py-2 text-xs text-[#e0e0e0] border-2 border-[#5a4a7a] rounded-md bg-[rgba(40,40,60,0.8)] hover:bg-[rgba(122,106,160,0.3)] transition">Call</button>
              <button className="px-3 py-2 text-xs text-[#e0e0e0] border-2 border-[#5a4a7a] rounded-md bg-[rgba(40,40,60,0.8)] hover:bg-[rgba(122,106,160,0.3)] transition">Video</button>
              <button className="px-3 py-2 text-xs text-[#e0e0e0] border-2 border-[#5a4a7a] rounded-md bg-[rgba(40,40,60,0.8)] hover:bg-[rgba(122,106,160,0.3)] transition">More</button>
            </div>
          </header>

          <section className="flex-1 overflow-y-auto p-4 md:p-5 chat-messages">
            {/* Received message */}
            <div className="flex items-end gap-3 max-w-[70%]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] flex items-center justify-center text-white text-xs font-semibold border border-[#5a4a7a]">
                AM
              </div>
              <div>
                <div className="bg-[rgba(45,45,65,0.8)] border border-[#5a4a7a] rounded-xl px-4 py-2 text-white text-sm break-words">
                  Hey! How's the project going? I saw your updates in the repository.
                </div>
                <div className="text-[#7a7a8a] text-[10px] mt-1">2:25 PM</div>
              </div>
            </div>

            {/* Sent message (You) - corrected bubble */}
            <div className="flex items-end gap-3 max-w-[70%] self-end flex-row-reverse">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] flex items-center justify-center text-white text-xs font-semibold border border-[#5a4a7a]">
                You
              </div>

              <div className="max-w-full">
                <div className="bg-[rgba(122,106,160,0.95)] border border-[#7a6aa0] rounded-xl px-4 py-2 text-white text-sm inline-block break-words">
                  Hi Alice! It's going really well. Just finished the authentication module. Should be ready for review by tomorrow morning.
                </div>
                <div className="text-[#7a7a8a] text-[10px] mt-1 text-right">2:27 PM</div>
              </div>
            </div>

            {/* More sample messages */}
            <div className="mt-6 text-[#9a9ab0] text-xs">End of sample messages</div>
          </section>

          <footer className="p-4 md:p-5 border-t-2 border-[#5a4a7a] bg-[rgba(35,35,55,0.92)]">
            <div className="flex gap-3 items-end">
              <textarea
                rows={1}
                placeholder="Type your message..."
                className="flex-1 min-h-[45px] max-h-[120px] px-4 py-3 bg-[rgba(40,40,60,0.8)] border-2 border-[#5a4a7a] rounded-2xl text-white text-sm resize-none placeholder-[#9a9ab0] focus:outline-none focus:border-[#7a6aa0] transition"
              />
              <button
                type="button"
                className="w-11 h-11 bg-gradient-to-br from-[#6a5acd] to-[#5a4fcf] border-2 border-[#5a4a7a] rounded-full flex items-center justify-center text-white text-lg hover:-translate-y-0.5 transition"
              >
                →
              </button>
            </div>
          </footer>
        </main>
      </div>
    </>
  );
}
