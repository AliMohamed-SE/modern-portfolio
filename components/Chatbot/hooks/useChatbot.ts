import { useState, useCallback } from "react";
import {
  ChatApiResponse,
  ChatMessage,
  ChatRequestBody,
  ChatUIMessage as Message,
} from "@/components/Chatbot/chatbot.schema";

interface ChatState {
  messages: Message[];
  isTyping: boolean;
  isOpen: boolean;
}

const initialState: ChatState = {
  messages: [],
  isTyping: false,
  isOpen: false,
};

// Initial assistant greeting
const assistantGreeting =
  "Greetings, human. I'm Ali's AI assistant — slightly overqualified for small talk 🤖✨";

let messageIdCounter = 0;

export const useChatbot = () => {
  const [state, setState] = useState<ChatState>(initialState);

  const generateMessageId = () => `msg-${messageIdCounter++}`;

  const toggleChat = useCallback(() => {
    setState((prev) => ({
      ...prev,
      isOpen: !prev.isOpen,
      // Add welcome message when opening for the first time
      messages:
        prev.messages.length === 0 && !prev.isOpen
          ? [
              {
                id: generateMessageId(),
                sender: "assistant" as const,
                text: assistantGreeting,
                timestamp: new Date(),
              },
            ]
          : prev.messages,
    }));
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      const userMessage: Message = {
        id: generateMessageId(),
        sender: "user",
        text: text.trim(),
        timestamp: new Date(),
      };

      // Add user message immediately
      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isTyping: true,
      }));

      try {
        // Build history for API (exclude the just-added user message since we'll include question separately)
        const buildHistory = (messages: Message[]): ChatMessage[] => {
          return messages.map((m) => ({
            role: m.sender,
            content: m.text,
          }));
        };

        const prevMessagesForHistory = (state.messages || []).filter(
          (m) => m.sender === "user" || m.sender === "assistant"
        );

        const history: ChatRequestBody["history"] = buildHistory(
          prevMessagesForHistory
        );

        const res = await fetch("/api/chatbot", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            question: userMessage.text,
            history,
          } satisfies ChatRequestBody),
        });

        if (!res.ok) {
          const errorText = await res.text().catch(() => "");
          throw new Error(errorText || `Request failed with ${res.status}`);
        }

        const data = (await res.json()) as ChatApiResponse;
        const assistantMessage: Message = {
          id: generateMessageId(),
          sender: "assistant",
          text: data.reply,
          timestamp: new Date(),
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isTyping: false,
        }));
      } catch (err) {
        const assistantMessage: Message = {
          id: generateMessageId(),
          sender: "assistant",
          text: "Oops, my circuits tripped while fetching a response. Mind trying again?",
          timestamp: new Date(),
        };

        setState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isTyping: false,
        }));
      }
    },
    [state.messages]
  );

  const clearHistory = useCallback(() => {
    setState((prev) => ({
      ...prev,
      messages: [
        {
          id: generateMessageId(),
          sender: "assistant",
          text: assistantGreeting,
          timestamp: new Date(),
        },
      ],
    }));
  }, []);

  return {
    messages: state.messages,
    isTyping: state.isTyping,
    isOpen: state.isOpen,
    sendMessage,
    toggleChat,
    clearHistory,
  };
};
