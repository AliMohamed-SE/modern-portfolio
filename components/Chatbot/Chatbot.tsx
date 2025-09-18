"use client";
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useChatbot } from "./hooks/useChatbot";
import { MessageCircle, X, Send, Trash2 } from "lucide-react";

// Standalone chatbot color scheme
const chatbotStyles = {
  // Core colors
  primary: "#00d4ff", // Electric cyan
  secondary: "#8b5cf6", // Purple
  background: "#0f1419", // Dark background
  surface: "#1a202c", // Card surface
  surfaceLight: "#2d3748", // Lighter surface
  border: "#374151", // Border color
  text: "#ffffff", // Primary text
  textMuted: "#9ca3af", // Muted text
  textOnPrimary: "#0f1419", // Text on primary background

  // Status colors
  success: "#10b981",
  danger: "#ef4444",

  // Gradients
  primaryGradient: "linear-gradient(135deg, #00d4ff, #8b5cf6)",
  glassBackground:
    "linear-gradient(135deg, rgba(26, 32, 44, 0.8), rgba(45, 55, 72, 0.6))",

  // Shadows & Effects
  primaryShadow: "0 0 20px rgba(0, 212, 255, 0.3)",
  glowShadow: "0 0 40px rgba(0, 212, 255, 0.15)",
  glassShadow: "0 8px 32px rgba(15, 20, 25, 0.3)",
};

const Chatbot = () => {
  const { messages, isTyping, isOpen, sendMessage, toggleChat, clearHistory } =
    useChatbot();
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      sendMessage(inputValue);
      setInputValue("");
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <div className="fixed sm:bottom-6 bottom-2 right-6 z-50">
        <Button
          onClick={toggleChat}
          className={`w-14 h-14 rounded-full shadow-lg transition-all duration-300 glow-button float ${
            isOpen ? "hover:opacity-90" : "hover:shadow-2xl"
          }`}
          style={{
            background: isOpen
              ? chatbotStyles.danger
              : chatbotStyles.primaryGradient,
            color: chatbotStyles.textOnPrimary,
            boxShadow: isOpen ? "none" : chatbotStyles.primaryShadow,
          }}
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <MessageCircle className="w-6 h-6" />
          )}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div
          className="fixed sm:bottom-24 bottom-20 right-6 ml-6 sm:w-96 h-[500px] z-50 rounded-2xl shadow-2xl custom-scrollbar"
          style={{
            background: chatbotStyles.glassBackground,
            backdropFilter: "blur(12px)",
            border: `1px solid ${chatbotStyles.border}`,
            boxShadow: chatbotStyles.glassShadow,
          }}
        >
          {/* Chat Header */}
          <div
            className="flex items-center justify-between p-4 border-b"
            style={{ borderColor: `${chatbotStyles.border}80` }}
          >
            <div className="flex items-center space-x-3">
              <div className="text-2xl rounded-full flex items-center justify-center">
                🤖
              </div>
              <div>
                <h3
                  className="font-semibold"
                  style={{ color: chatbotStyles.text }}
                >
                  AI Assistant
                </h3>
                <p
                  className="text-xs"
                  style={{ color: chatbotStyles.textMuted }}
                >
                  Online
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearHistory}
              style={{ color: chatbotStyles.textMuted }}
              className="hover:opacity-70"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[340px] custom-scrollbar">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className="max-w-[80%] rounded-2xl px-4 py-3"
                  style={{
                    background:
                      message.sender === "user"
                        ? chatbotStyles.primaryGradient
                        : `${chatbotStyles.surface}80`,
                    color:
                      message.sender === "user"
                        ? chatbotStyles.textOnPrimary
                        : chatbotStyles.text,
                    border:
                      message.sender === "user"
                        ? "none"
                        : `1px solid ${chatbotStyles.border}80`,
                  }}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p
                    className="text-xs mt-2"
                    style={{
                      color:
                        message.sender === "user"
                          ? `${chatbotStyles.textOnPrimary}80`
                          : chatbotStyles.textMuted,
                    }}
                  >
                    {formatTime(message.timestamp)}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div
                  className="rounded-2xl px-4 py-3 max-w-[80%]"
                  style={{
                    background: `${chatbotStyles.surface}80`,
                    border: `1px solid ${chatbotStyles.border}80`,
                  }}
                >
                  <div className="flex space-x-1">
                    <div className="flex space-x-1">
                      <div
                        className="w-2 h-2 rounded-full typing-indicator"
                        style={{
                          backgroundColor: chatbotStyles.primary,
                          animationDelay: "0ms",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full typing-indicator"
                        style={{
                          backgroundColor: chatbotStyles.primary,
                          animationDelay: "200ms",
                        }}
                      />
                      <div
                        className="w-2 h-2 rounded-full typing-indicator"
                        style={{
                          backgroundColor: chatbotStyles.primary,
                          animationDelay: "400ms",
                        }}
                      />
                    </div>
                  </div>
                  <p
                    className="text-xs mt-2"
                    style={{ color: chatbotStyles.textMuted }}
                  >
                    Assistant is typing...
                  </p>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div
            className="p-4 border-t"
            style={{ borderColor: `${chatbotStyles.border}80` }}
          >
            <div className="flex space-x-2">
              <Input
                ref={inputRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
                style={{
                  background: `${chatbotStyles.background}80`,
                  border: `1px solid ${chatbotStyles.border}80`,
                  color: chatbotStyles.text,
                }}
                disabled={isTyping}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputValue.trim() || isTyping}
                className="glow-button hover:opacity-90"
                style={{
                  background: chatbotStyles.primaryGradient,
                  color: chatbotStyles.textOnPrimary,
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
