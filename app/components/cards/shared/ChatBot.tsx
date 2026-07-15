"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import {
  MessageCircle,
  X,
  Send,
  User,
  Expand,
  Shrink,
} from "lucide-react";
import { cn } from "../../../../libs/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
}

interface ChatbotProps {
  className?: string;
}

export function Chatbot({ className }: ChatbotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Oleks. How can I help you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasNewMessages, setHasNewMessages] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    // Use requestAnimationFrame to ensure DOM is updated
    requestAnimationFrame(() => {
      setTimeout(() => {
        if (messagesContainerRef.current) {
          messagesContainerRef.current.scrollTop =
            messagesContainerRef.current.scrollHeight;
          setHasNewMessages(false);
        }
      }, 50);
    });
  };

  useEffect(() => {
    if (messages.length > 0 || isTyping) {
      scrollToBottom();
    }
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Scroll to bottom when chat is opened
      setTimeout(() => {
        scrollToBottom();
      }, 200);
    }
  }, [isOpen]);

  // Maintain focus on input when typing state changes
  useEffect(() => {
    if (isOpen && inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [isTyping, isOpen]);

  // Handle scroll events to clear new messages indicator
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 10;

      if (isAtBottom && hasNewMessages) {
        setHasNewMessages(false);
      }
    };

    container.addEventListener("scroll", handleScroll);
    return () => container.removeEventListener("scroll", handleScroll);
  }, [hasNewMessages]);

  // Prevent background scrolling when chat is open
  useEffect(() => {
    if (isOpen) {
      // Save original overflow
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = originalStyle;
      };
    }
  }, [isOpen]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);
    setHasNewMessages(true);

    // Immediate scroll after adding user message
    setTimeout(() => {
      scrollToBottom();
    }, 10);

    // Scroll when typing indicator appears
    setTimeout(() => {
      scrollToBottom();
    }, 50);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: [...messages, userMessage],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      if (!response.body) {
        throw new Error("No response body");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let accumulatedContent = "";
      let buffer = "";

      // Create initial bot message
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, botMessage]);

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          if (line.trim() === "") continue;
          if (line.startsWith("data: ")) {
            const data = line.slice(6);

            if (data === "[DONE]") {
              // Ensure final content is displayed
              setMessages((prev) =>
                prev.map((msg) =>
                  msg.id === botMessage.id
                    ? { ...msg, content: accumulatedContent }
                    : msg,
                ),
              );

              setIsTyping(false);
              setHasNewMessages(true);
              setTimeout(() => scrollToBottom(), 100);
              return;
            }

            try {
              const parsed = JSON.parse(data);
              if (parsed.content) {
                accumulatedContent += parsed.content;

                // Update the message content without throttling so it streams naturally
                setMessages((prev) =>
                  prev.map((msg) =>
                    msg.id === botMessage.id
                      ? { ...msg, content: accumulatedContent }
                      : msg,
                  ),
                );

                // Scroll to show new content
                setTimeout(() => scrollToBottom(), 20);
              }
            } catch (e) {
              // Ignore parsing errors for incomplete chunks
            }
          }
        }
      }

      setIsTyping(false);
      setHasNewMessages(true);
      setTimeout(() => scrollToBottom(), 100);
    } catch (error) {
      console.error("Error calling OpenAI API:", error);

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content:
          "Sorry, I'm having trouble responding right now. Please try again later.",
        sender: "bot",
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, errorMessage]);
      setIsTyping(false);
      setHasNewMessages(true);

      // Scroll after error message is added
      setTimeout(() => {
        scrollToBottom();
      }, 10);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setIsExpanded(false);
    }
  };

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={cn(
        "fixed bottom-[35px] right-[35px] z-50 sm:bottom-20 sm:right-20",
        className,
      )}
    >
      {/* Chat Toggle Button */}
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="toggle-button"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 right-0"
          >
            <button
              onClick={toggleChat}
              className="group relative flex h-12 w-12 items-center justify-center rounded-full bg-sky-500 p-0 shadow-lg transition-all hover:bg-sky-600 sm:h-14 sm:w-14"
            >
              <MessageCircle className="h-5 w-5 text-white transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-sky-300 sm:h-3 sm:w-3 border border-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.div
            key="chat-window"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute bottom-0 right-0 origin-bottom-right"
          >
            <div
              className={cn(
                "relative flex flex-col overflow-hidden rounded-2xl bg-white/95 backdrop-blur-xl shadow-2xl ring-1 ring-slate-200/50 transition-all duration-500 ease-in-out",
                // Responsive width
                isExpanded
                  ? "w-[calc(100vw-40px)] sm:w-[calc(100vw-80px)] lg:w-[800px] xl:w-[1000px]"
                  : "w-[calc(100vw-70px)] max-w-[400px] sm:w-[400px] lg:w-[450px]",
                // Responsive height
                isExpanded
                  ? "h-[calc(100vh-40px)] sm:h-[calc(100vh-100px)] max-h-[900px]"
                  : "h-[calc(100vh-100px)] max-h-[600px] sm:h-[600px]",
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "flex items-center justify-between px-4 sm:px-6 transition-all duration-500 ease-in-out z-10",
                  "h-16 border-b border-slate-100 bg-slate-50/50",
                )}
              >
                {/* Left side - title */}
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-500/20 text-sky-600">
                    <MessageCircle className="w-4 h-4" />
                  </div>
                  <span className="font-semibold text-slate-800 text-sm sm:text-base tracking-wide">
                    AI Assistant
                  </span>
                </div>

                {/* Right side - Control buttons */}
                <div className="flex items-center gap-1">
                  <button
                    onClick={toggleExpand}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                  >
                    {isExpanded ? (
                      <Shrink className="h-4 w-4" />
                    ) : (
                      <Expand className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={toggleChat}
                    className="flex h-8 w-8 items-center justify-center rounded-full text-slate-500 hover:bg-slate-200 hover:text-slate-800 transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              <>
                <div
                    ref={messagesContainerRef}
                    className="scrollbar-clean flex-1 overflow-y-auto overscroll-contain p-4 sm:p-5 space-y-6"
                  >
                    {/* Chat History Start Indicator */}
                    <div className="flex items-center justify-center pt-2 pb-4">
                      <div className="flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-4 py-1.5">
                        <div className="relative flex h-2 w-2">
                          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-400 opacity-75"></span>
                          <span className="relative inline-flex h-2 w-2 rounded-full bg-sky-500"></span>
                        </div>
                        <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">
                          Chat Started
                        </span>
                      </div>
                    </div>

                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className={cn(
                          "flex gap-3",
                          message.sender === "user"
                            ? "flex-row-reverse"
                            : "flex-row",
                        )}
                      >
                        {/* Avatar */}
                        {message.sender === "bot" ? (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 mt-1 border border-sky-100">
                            <MessageCircle className="h-4 w-4" />
                          </div>
                        ) : (
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 mt-1 border border-slate-200">
                            <User className="h-4 w-4" />
                          </div>
                        )}

                        {/* Bubble */}
                        <div
                          className={cn(
                            "relative flex max-w-[80%] flex-col px-4 py-3 text-sm shadow-sm",
                            message.sender === "user"
                              ? "bg-sky-500 text-white rounded-2xl rounded-tr-sm"
                              : "bg-slate-50 text-slate-700 rounded-2xl rounded-tl-sm border border-slate-200",
                          )}
                        >
                          <div className={cn(
                            "leading-relaxed",
                            message.sender === "user" 
                              ? "whitespace-pre-wrap"
                              : "prose prose-sm max-w-none prose-p:leading-relaxed prose-p:last:mb-0 prose-pre:bg-slate-800 prose-pre:border prose-pre:border-slate-700 prose-code:text-sky-400"
                          )}>
                            {message.sender === "bot" ? (
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {message.content}
                              </ReactMarkdown>
                            ) : (
                              message.content
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {/* Typing Indicator */}
                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex gap-3 flex-row"
                      >
                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sky-50 text-sky-600 mt-1 border border-sky-100">
                          <MessageCircle className="h-4 w-4" />
                        </div>
                        <div className="flex items-center gap-1.5 px-4 py-4 rounded-2xl rounded-tl-sm bg-slate-50 text-slate-700 border border-slate-200">
                          <div
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                            style={{ animationDelay: "0ms" }}
                          ></div>
                          <div
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                            style={{ animationDelay: "150ms" }}
                          ></div>
                          <div
                            className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400"
                            style={{ animationDelay: "300ms" }}
                          ></div>
                        </div>
                      </motion.div>
                    )}

                    {/* New Messages Indicator */}
                    {hasNewMessages && (
                      <div className="flex items-center justify-center py-2">
                        <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1 shadow-sm">
                          <div className="h-2 w-2 animate-pulse rounded-full bg-sky-500"></div>
                          <span className="text-xs font-medium text-sky-600">
                            New messages below
                          </span>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} className="h-2" />
                  </div>

                  {/* Input Area */}
                  <div className="p-4 sm:p-5 bg-white/80 backdrop-blur-md border-t border-slate-200">
                    <div className="relative flex items-center">
                      <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder={
                          isTyping
                            ? "AI is typing..."
                            : "Message AI Assistant..."
                        }
                        disabled={isTyping}
                        className="w-full rounded-full bg-slate-50 border border-slate-200 py-3.5 pl-5 pr-12 text-sm text-slate-800 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500/50 focus:bg-white focus:border-transparent disabled:opacity-50 transition-all shadow-inner"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="absolute right-1.5 flex h-10 w-10 items-center justify-center rounded-full bg-sky-500 text-white transition-all hover:bg-sky-400 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:bg-sky-500 disabled:hover:scale-100"
                      >
                        <Send className="h-4 w-4 ml-0.5" />
                      </button>
                    </div>
                  </div>
                </>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
