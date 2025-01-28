export interface ChatConfig {
  systemPrompt: string;
}

export const defaultConfig: ChatConfig = {
  systemPrompt: "Sen yardımcı bir AI asistanısın. Kullanıcılara nazik ve bilgilendirici yanıtlar verirsin."
};

export const updateSystemPrompt = (newPrompt: string) => {
  defaultConfig.systemPrompt = newPrompt;
};