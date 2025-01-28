import { useState } from "react";
import { defaultConfig } from "../config/chat-config";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";
import { toast } from "../components/ui/use-toast";

interface Message {
  id: string;
  content: string;
  role: "user" | "assistant";
}

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async (content: string) => {
    if (!content.trim()) return;

    const apiKey = localStorage.getItem("GEMINI_API_KEY");
    if (!apiKey) {
      toast({
        variant: "destructive",
        title: "Hata!",
        description: "API anahtarı bulunamadı. Lütfen API anahtarınızı girin.",
      });
      return;
    }

    const newUserMessage: Message = {
      id: Date.now().toString(),
      content,
      role: "user",
    };

    setMessages((prev) => [...prev, newUserMessage]);
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              role: "user",
              parts: [{ text: defaultConfig.systemPrompt }],
            },
            {
              role: "user", 
              parts: [{ text: content }],
            },
          ],
        }),
      });

      if (!response.ok) {
        throw new Error("API yanıt vermedi");
      }

      const data = await response.json();
      const aiResponse = data.candidates[0].content.parts[0].text;

      const newAiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        role: "assistant",
      };

      setMessages((prev) => [...prev, newAiMessage]);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Hata!",
        description: "Mesaj gönderilemedi. Lütfen API anahtarınızı kontrol edin.",
      });
      console.error("API Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto bg-white shadow-xl rounded-lg">
      <div className="p-4 border-b">
        <h1 className="text-2xl font-bold text-primary">AI Sohbet</h1>
      </div>
      <MessageList messages={messages} isLoading={isLoading} />
      <MessageInput onSend={sendMessage} isLoading={isLoading} />
    </div>
  );
};

export default ChatInterface;