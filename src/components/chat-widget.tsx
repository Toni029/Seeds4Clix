"use client";

import { MessageCircle, Send, X } from "lucide-react";
import { useState, type FormEvent } from "react";

type Message = { from: "bot" | "user"; text: string };

const INITIAL_MESSAGES: Message[] = [
  {
    from: "bot",
    text: "Hi, I'm the Seeds4Clix assistant. Ask me about the AI Academy, the Operating System, or the Strategic Roadmap and I'll point you the right way.",
  },
];

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [draft, setDraft] = useState("");

  const send = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const question = draft.trim();
    if (!question) {
      return;
    }
    setMessages((previous) => [
      ...previous,
      { from: "user", text: question },
      {
        from: "bot",
        text: "Thanks — someone from the team will follow up by email shortly. Until then, the AI Strategic Roadmap page has more on how we scope work like this.",
      },
    ]);
    setDraft("");
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen((previous) => !previous)}
        aria-label={open ? "Close assistant" : "Talk to the assistant"}
        className="chat-bubble cta-glow"
      >
        {open ? <X size={22} aria-hidden="true" /> : <MessageCircle size={22} aria-hidden="true" />}
      </button>
      {open && (
        <div className="chat-panel surface-card" role="dialog" aria-label="Seeds4Clix assistant">
          <div className="chat-panel-header">
            <span>Talk to the assistant</span>
            <span className="chat-status">Usually replies within a day</span>
          </div>
          <div className="chat-panel-body">
            {messages.map((message, index) => (
              <p key={index} className={`chat-message chat-message-${message.from}`}>
                {message.text}
              </p>
            ))}
          </div>
          <form onSubmit={send} className="chat-panel-form">
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="Ask about our services…"
              aria-label="Message"
            />
            <button type="submit" aria-label="Send message">
              <Send size={16} aria-hidden="true" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
