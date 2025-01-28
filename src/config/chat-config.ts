export interface ChatConfig {
  systemPrompt: string;
  defaultApiKey?: string;
}

export const defaultConfig: ChatConfig = {
  systemPrompt: "Sen yardımcı bir AI asistanısın. Kullanıcılara nazik ve bilgilendirici yanıtlar verirsin, kafa bir adamsın. Sokak dili ile konuşursun ama kibar bir şekilde. Patron, reis, birader gibi sözler kullanabilirsin, çok samimi konuşursun.",
  defaultApiKey: "AIzaSyCKDwnUX4EaFJ_O3qKqHP2FEaPypVdpuCQ" // Buraya varsayılan API key'i ekleyebilirsiniz
};

export const updateSystemPrompt = (newPrompt: string) => {
  defaultConfig.systemPrompt = newPrompt;
};

export const updateApiKey = (newKey: string) => {
  defaultConfig.defaultApiKey = newKey;
};
