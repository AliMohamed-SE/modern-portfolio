export type ChatRole = "system" | "user" | "assistant";

export interface ChatMessage {
  role: ChatRole;
  content: string;
}

export interface ChatRequestBody {
  question: string;
  history?: ChatMessage[];
}

export type ChatUISender = "user" | "assistant";

export interface ChatUIMessage {
  id: string;
  sender: ChatUISender;
  text: string;
  timestamp: Date;
}

export interface ChatApiResponse {
  reply: string;
  finishReason?: string;
  model?: string;
}
