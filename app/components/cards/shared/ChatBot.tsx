"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  User,
  Minimize2,
  Maximize2,
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
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm Randy. How can I help you today?",
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
      let lastUpdateTime = 0;
      const updateInterval = 50; // Minimum 50ms between updates for smoothness

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

        const chunk = decoder.decode(value);
        const lines = chunk.split("\n");

        for (const line of lines) {
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

                // Throttle updates for smoother appearance
                const now = Date.now();
                if (now - lastUpdateTime >= updateInterval) {
                  // Update the message content
                  setMessages((prev) =>
                    prev.map((msg) =>
                      msg.id === botMessage.id
                        ? { ...msg, content: accumulatedContent }
                        : msg,
                    ),
                  );

                  // Scroll to show new content
                  setTimeout(() => scrollToBottom(), 20);
                  lastUpdateTime = now;
                }
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
      setIsMinimized(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div
      className={cn(
        "fixed bottom-2 right-2 z-50 sm:bottom-4 sm:right-4",
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
            className="relative"
          >
            <div
              className={cn(
                "relative overflow-hidden rounded-3xl border-8 border-white bg-white shadow-2xl transition-all duration-500 ease-in-out",
                // Responsive width and height
                "w-[calc(100vw-1rem)] max-w-[400px] sm:w-[400px] lg:w-[450px]",
                // Responsive height
                isMinimized
                  ? "h-[64px] sm:h-[68px]"
                  : "h-[calc(100vh-2rem)] max-h-[500px] sm:h-[500px]",
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "flex items-center justify-between bg-slate-50 px-4 transition-all duration-500 ease-in-out sm:px-6",
                  isMinimized
                    ? "h-12 sm:h-14 border-0"
                    : "h-14 sm:h-16 border-b border-slate-100",
                )}
              >
                {/* Left side - title */}
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <span
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-sky-100 shrink-0"
                      aria-hidden
                    >
                      <MessageCircle className="w-4 h-4 text-sky-600" />
                    </span>
                    <span className="font-bold text-slate-800 text-sm sm:text-base">
                      AI Assistant
                    </span>
                  </div>
                </div>

                {/* Right side - Control buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={toggleMinimize}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-4 w-4" />
                    ) : (
                      <Minimize2 className="h-4 w-4" />
                    )}
                  </button>
                  <button
                    onClick={toggleChat}
                    className="flex h-8 w-8 items-center justify-center rounded-full hover:bg-slate-200 transition-colors text-slate-500 hover:text-slate-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Messages Area */}
              {!isMinimized && (
                <div className="flex h-[calc(100%-48px)] flex-col sm:h-[calc(100%-52px)]">
                  <div
                    ref={messagesContainerRef}
                    className="scrollbar-clean flex-1 overflow-y-auto p-3 sm:p-4"
                  >
                    <div className="space-y-3 sm:space-y-4">
                      {/* Chat History Start Indicator */}
                      <div className="flex items-center justify-center py-2">
                        <div className="flex items-center gap-2 rounded-full border border-slate-100 bg-slate-50 px-3 py-1">
                          <div className="relative">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-slate-400"></div>
                            <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-slate-400 opacity-20"></div>
                          </div>
                          <span className="text-xs font-medium text-slate-500">
                            Chat started
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
                            "flex gap-2 sm:gap-3",
                            message.sender === "user"
                              ? "justify-end lg:justify-start"
                              : "justify-start",
                          )}
                        >
                          {message.sender === "bot" && (
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100">
                              <MessageCircle className="h-4 w-4 text-sky-600" />
                            </div>
                          )}
                          {message.sender === "user" && (
                            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 lg:order-first">
                              <User className="h-4 w-4 text-slate-500" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "relative max-w-[85%] rounded-2xl px-4 py-3 text-sm shadow-sm sm:max-w-[80%]",
                              message.sender === "user"
                                ? "rounded-br-md bg-sky-500 text-white"
                                : "rounded-bl-md border border-slate-100 bg-white text-slate-700",
                            )}
                          >
                            <div className="leading-relaxed">
                              {message.content}
                            </div>
                          </div>
                        </motion.div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="flex gap-2 sm:gap-3"
                        >
                          <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded-full bg-sky-100">
                            <MessageCircle className="h-4 w-4 text-sky-600" />
                          </div>
                          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-slate-100 bg-white px-4 py-3 shadow-sm">
                            <div className="flex gap-1.5">
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-sky-400"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* New Messages Indicator */}
                      {hasNewMessages && (
                        <div className="flex items-center justify-center py-2">
                          <div className="flex items-center gap-2 rounded-full border border-sky-200 bg-sky-50 px-3 py-1">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-sky-500"></div>
                            <span className="text-xs font-medium text-sky-600">
                              New messages
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-slate-100 bg-slate-50 p-3 sm:p-4">
                    <div className="flex gap-2">
                      <input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInputValue(e.target.value)}
                        onKeyPress={handleKeyPress}
                        onClick={() => {
                          if (isTyping && inputRef.current) {
                            inputRef.current.focus();
                          }
                        }}
                        placeholder={
                          isTyping
                            ? "AI is responding..."
                            : "Type your message..."
                        }
                        disabled={isTyping}
                        className="flex-1 rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-sky-500 focus:outline-none focus:ring-1 focus:ring-sky-500 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-50"
                      />
                      <button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="flex h-8 w-8 items-center justify-center rounded-md bg-sky-500 p-0 hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-50 sm:h-10 sm:w-10 transition-colors"
                      >
                        <Send className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
