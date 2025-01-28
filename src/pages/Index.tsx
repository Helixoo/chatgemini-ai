import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";

const Index = () => {
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem("GEMINI_API_KEY"));

  const handleApiKeySubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const apiKey = formData.get("apiKey") as string;
    
    if (apiKey) {
      localStorage.setItem("GEMINI_API_KEY", apiKey);
      setShowApiInput(false);
      toast({
        title: "Başarılı!",
        description: "API anahtarı kaydedildi.",
      });
    }
  };

  if (showApiInput) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold text-center mb-6">Gemini API Anahtarı</h1>
          <form onSubmit={handleApiKeySubmit} className="space-y-4">
            <Input
              name="apiKey"
              type="password"
              placeholder="API Anahtarınızı girin"
              required
            />
            <Button type="submit" className="w-full">
              Kaydet
            </Button>
          </form>
        </div>
      </div>
    );
  }

  return <ChatInterface />;
};

export default Index;