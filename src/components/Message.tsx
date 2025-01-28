interface MessageProps {
  message: {
    content: string;
    role: "user" | "assistant";
  };
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.role === "user";

  // Basit markdown formatlaması için metin işleme
  const formatText = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        // ** ile kalın yazı
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        // * ile italik yazı
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
        // ` ile kod bloğu
        line = line.replace(/`(.*?)`/g, '<code>$1</code>');
        return line;
      })
      .join('<br />');
  };

  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`max-w-[80%] rounded-lg px-4 py-2 ${
          isUser
            ? "bg-primary text-primary-foreground"
            : "bg-muted text-muted-foreground"
        }`}
      >
        <p 
          className="whitespace-pre-wrap prose prose-sm dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: formatText(message.content) }}
        />
      </div>
    </div>
  );
};

export default Message;