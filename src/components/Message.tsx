interface MessageProps {
  message: {
    content: string;
    role: "user" | "assistant";
  };
}

const Message = ({ message }: MessageProps) => {
  const isUser = message.role === "user";

  const formatText = (text: string) => {
    return text
      .split('\n')
      .map((line, i) => {
        line = line.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        line = line.replace(/\*(.*?)\*/g, '<em>$1</em>');
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
            ? "bg-primary text-white"
            : "bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100"
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