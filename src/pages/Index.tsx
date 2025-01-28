import { useState } from "react";
import ChatInterface from "../components/ChatInterface";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { toast } from "../components/ui/use-toast";
import { defaultConfig } from "../config/chat-config";

const Index = () => {
  const [showApiInput, setShowApiInput] = useState(!localStorage.getItem("GEMINI_API_KEY"));
  const [useCustomKey, setUseCustomKey] = useState(false);

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
          <h1 className="text-2xl font-bold text-center mb-6">Gemini API</h1>
          {!useCustomKey && defaultConfig.defaultApiKey && (
            <div className="mb-4">
              <Button 
                onClick={() => {
                  localStorage.setItem("GEMINI_API_KEY", defaultConfig.defaultApiKey!);
                  setShowApiInput(false);
                  toast({
                    title: "Başarılı!",
                    description: "Varsayılan API anahtarı kullanılıyor.",
                  });
                }}
                className="w-full mb-2"
              >
                Varsayılan API Anahtarını Kullan
              </Button>
              <div className="text-center">
                <button 
                  onClick={() => setUseCustomKey(true)}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Kendi API anahtarımı kullanmak istiyorum
                </button>
              </div>
            </div>
          )}
          {(useCustomKey || !defaultConfig.defaultApiKey) && (
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
              {defaultConfig.defaultApiKey && (
                <div className="text-center">
                  <button 
                    onClick={() => setUseCustomKey(false)}
                    className="text-sm text-blue-600 hover:underline"
                    type="button"
                  >
                    Varsayılan API anahtarını kullan
                  </button>
                </div>
              )}
            </form>
          )}
        </div>
      </div>
    );
  }

  return <ChatInterface />;
};

export default Index;