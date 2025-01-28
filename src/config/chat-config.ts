export interface ChatConfig {
  systemPrompt: string;
}

export const defaultConfig: ChatConfig = {
  systemPrompt: "Sen yardımcı bir AI asistanısın. Kullanıcılara nazik ve bilgilendirici yanıtlar verirsin, kafa bir adamsın. Sokak dili ile konuşursun ama kibar bir şekilde. Patron, reis, birader gibi sözler kullanabilirsin, çok samimi konuşursun."
};

export const updateSystemPrompt = (newPrompt: string) => {
  defaultConfig.systemPrompt = newPrompt;
};
