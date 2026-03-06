"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  MessageCircle,
  X,
  Send,
  User,
  Minimize2,
  Maximize2,
} from "lucide-react";
import { cn } from "@/lib/utils";

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
      content: "Hello! I'm Steve Anguiano. How can I help you today?",
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
            <Button
              onClick={toggleChat}
              className="group relative h-12 w-12 rounded-full bg-primary-base p-0 shadow-lg transition-all hover:bg-primary-base/90 dark:bg-primary-base-dark dark:hover:bg-primary-base-dark/90 sm:h-14 sm:w-14"
              size="icon"
            >
              <MessageCircle className="h-5 w-5 text-white transition-transform group-hover:scale-110 sm:h-6 sm:w-6" />
              <div className="absolute -right-1 -top-1 h-2.5 w-2.5 rounded-full bg-accent-base dark:bg-accent-base-dark sm:h-3 sm:w-3" />
            </Button>
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
                "relative overflow-hidden rounded-lg border border-primary-base/20 bg-background-base/95 shadow-xl backdrop-blur-sm transition-all duration-500 ease-in-out dark:border-primary-base-dark/20 dark:bg-background-base-dark/95",
                // Responsive width and height
                "w-[calc(100vw-1rem)] max-w-[400px] sm:w-[400px] lg:w-[450px]",
                // Responsive height
                isMinimized
                  ? "h-[48px] sm:h-[52px]"
                  : "h-[calc(100vh-2rem)] max-h-[500px] sm:h-[500px]",
              )}
            >
              {/* Header */}
              <div
                className={cn(
                  "flex items-center justify-between bg-background-base/80 px-3 transition-all duration-500 ease-in-out dark:bg-background-base-dark/80 sm:px-4",
                  isMinimized
                    ? "h-12 border-0"
                    : "h-12 border-b border-primary-base/10 dark:border-primary-base-dark/10",
                )}
              >
                {/* Left side - Traffic lights and title */}
                <div className="flex items-center gap-2 sm:gap-3">
                  <div className="flex items-center gap-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-red-500/60 sm:h-2 sm:w-2"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-yellow-500/60 sm:h-2 sm:w-2"></div>
                    <div className="h-1.5 w-1.5 rounded-full bg-green-500/60 sm:h-2 sm:w-2"></div>
                  </div>
                  <div className="flex items-center gap-1.5 sm:gap-2">
                    <motion.img
                      src="/images/chatassistant.png"
                      alt="Steve Anguiano"
                      className="h-6 w-6 rounded-full object-cover sm:h-7 sm:w-7"
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    />
                    <span className="font-space-grotesk text-xs font-medium text-primary-base-dark dark:text-primary-base-dark sm:text-sm">
                      AI Assistant
                    </span>
                  </div>
                </div>

                {/* Right side - Control buttons */}
                <div className="flex items-center gap-1">
                  <Button
                    onClick={toggleMinimize}
                    variant="ghost"
                    size="icon"
                    className="flex h-5 w-5 items-center justify-center rounded-md p-0 hover:bg-primary-base/10 dark:hover:bg-primary-base-dark/10 sm:h-6 sm:w-6"
                  >
                    {isMinimized ? (
                      <Maximize2 className="h-2.5 w-2.5 text-primary-base-dark dark:text-primary-base-dark sm:h-3 sm:w-3" />
                    ) : (
                      <Minimize2 className="h-2.5 w-2.5 text-primary-base-dark dark:text-primary-base-dark sm:h-3 sm:w-3" />
                    )}
                  </Button>
                  <Button
                    onClick={toggleChat}
                    variant="ghost"
                    size="icon"
                    className="flex h-5 w-5 items-center justify-center rounded-md p-0 hover:bg-primary-base/10 dark:hover:bg-primary-base-dark/10 sm:h-6 sm:w-6"
                  >
                    <X className="h-2.5 w-2.5 text-primary-base-dark dark:text-primary-base-dark sm:h-3 sm:w-3" />
                  </Button>
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
                        <div className="flex items-center gap-2 rounded-full border border-primary-base/10 bg-background-base/40 px-3 py-1 dark:border-primary-base-dark/10 dark:bg-background-base-dark/40">
                          <div className="relative">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-primary-base/60 dark:bg-primary-base-dark/60"></div>
                            <div className="absolute inset-0 h-2 w-2 animate-ping rounded-full bg-primary-base/40 dark:bg-primary-base-dark/40"></div>
                          </div>
                          <span className="text-xs font-medium text-primary-base-dark/70 dark:text-primary-base-dark/70">
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
                            // On mobile/tablet: user messages on right, AI on left
                            // On laptop+: all messages on left
                            message.sender === "user"
                              ? "justify-end lg:justify-start"
                              : "justify-start",
                          )}
                        >
                          {message.sender === "bot" && (
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-base/20 bg-gradient-to-br from-primary-base/20 to-primary-base/10 dark:border-primary-base-dark/20 dark:from-primary-base-dark/20 dark:to-primary-base-dark/10 sm:h-8 sm:w-8">
                              <img
                                src="/images/chatassistant.png"
                                alt="Steve Anguiano"
                                className="h-full w-full"
                              />
                            </div>
                          )}
                          {message.sender === "user" && (
                            <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-full border border-accent-base/20 bg-gradient-to-br from-accent-base/20 to-accent-base/10 dark:border-accent-base-dark/20 dark:from-accent-base-dark/20 dark:to-accent-base-dark/10 sm:h-8 sm:w-8 lg:order-first">
                              <User className="h-3.5 w-3.5 text-accent-base dark:text-accent-base-dark sm:h-4 sm:w-4" />
                            </div>
                          )}
                          <div
                            className={cn(
                              "relative max-w-[85%] rounded-2xl px-3 py-2 text-xs shadow-sm sm:max-w-[80%] sm:px-4 sm:py-3 sm:text-sm",
                              message.sender === "user"
                                ? "rounded-br-md bg-gradient-to-br from-primary-base to-primary-base/90 text-white dark:from-primary-base-dark dark:to-primary-base-dark/90 dark:text-white"
                                : "rounded-bl-md border border-primary-base/10 bg-gradient-to-br from-background-base/80 to-background-base/60 text-primary-base-dark dark:border-primary-base-dark/10 dark:from-background-base-dark/80 dark:to-background-base-dark/60 dark:text-primary-base-dark",
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
                          <div className="flex h-7 w-7 flex-shrink-0 items-center justify-center overflow-hidden rounded-full border border-primary-base/20 bg-gradient-to-br from-primary-base/20 to-primary-base/10 dark:border-primary-base-dark/20 dark:from-primary-base-dark/20 dark:to-primary-base-dark/10 sm:h-8 sm:w-8">
                            <img
                              src="/images/chatassistant.png"
                              alt="Steve Anguiano"
                              className="h-full w-full"
                            />
                          </div>
                          <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-primary-base/10 bg-gradient-to-br from-background-base/80 to-background-base/60 px-3 py-2 shadow-sm dark:border-primary-base-dark/10 dark:from-background-base-dark/80 dark:to-background-base-dark/60">
                            <div className="flex gap-1">
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-base/60 dark:bg-primary-base-dark/60 sm:h-2 sm:w-2"
                                style={{ animationDelay: "0ms" }}
                              ></div>
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-base/60 dark:bg-primary-base-dark/60 sm:h-2 sm:w-2"
                                style={{ animationDelay: "150ms" }}
                              ></div>
                              <div
                                className="h-1.5 w-1.5 animate-bounce rounded-full bg-primary-base/60 dark:bg-primary-base-dark/60 sm:h-2 sm:w-2"
                                style={{ animationDelay: "300ms" }}
                              ></div>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* New Messages Indicator */}
                      {hasNewMessages && (
                        <div className="flex items-center justify-center py-2">
                          <div className="flex items-center gap-2 rounded-full border border-accent-base/30 bg-accent-base/20 px-3 py-1 dark:border-accent-base-dark/30 dark:bg-accent-base-dark/20">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-accent-base"></div>
                            <span className="text-xs font-medium text-accent-base dark:text-accent-base-dark">
                              New messages
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                    <div ref={messagesEndRef} />
                  </div>

                  {/* Input Area */}
                  <div className="border-t border-primary-base/10 bg-background-base/80 p-3 dark:border-primary-base-dark/10 dark:bg-background-base-dark/80 sm:p-4">
                    <div className="flex gap-2">
                      <Input
                        ref={inputRef}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
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
                        className="flex-1 border-primary-base/20 bg-background-base/60 text-xs disabled:cursor-not-allowed disabled:opacity-50 dark:border-primary-base-dark/20 dark:bg-background-base-dark/60 sm:text-sm"
                      />
                      <Button
                        onClick={handleSendMessage}
                        disabled={!inputValue.trim() || isTyping}
                        className="h-8 w-8 rounded-md bg-primary-base p-0 hover:bg-primary-base/90 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-primary-base-dark dark:hover:bg-primary-base-dark/90 sm:h-10 sm:w-10"
                        size="icon"
                      >
                        <Send className="h-3.5 w-3.5 text-white sm:h-4 sm:w-4" />
                      </Button>
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
