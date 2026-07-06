import { useEffect, useRef, useState } from "react";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";
import { chatWithAI } from "../../services/aiService";
import MarkdownMessage from "./MarkdownMessage";

const ChatWindow = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);
    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages, loading]);

    const sendMessage = async (text) => {
        if(!text.trim() || loading) return;

        // Add user message
        setMessages((prev) => [
            ...prev,
            {role: "user", text },
        ]);
        setLoading(true);

        try{
            const reply = await chatWithAI(text);
            setMessages((prev) => [
                ...prev,
                {role: "assistant", text: reply },
            ]);
        } 
        catch(err){
            setMessages((prev) => [
                ...prev,
                {role: "assistant", text: "❌ Something went wrong. Please try again."},
            ]);
        } 
        finally{
            setLoading(false);
        }
    };

    return(
        <div className="flex-1 flex flex-col">
            <div className="flex-1 overflow-y-auto p-8">
                {messages.length === 0? (
                    <EmptyChat />
                ) : (
                    <div className="space-y-6">
                        {messages.map((msg, index) => (
                            <div key={index}
                                className={`chat ${msg.role === "user"? "chat-end" : "chat-start"}`}
                            >
                                <div className={`chat-bubble max-w-4xl ${
                                        msg.role === "user"? "chat-bubble-primary" : ""
                                    }`}
                                >
                                    <MarkdownMessage content={msg.text}/>
                                </div>
                            </div>
                        ))}
                        {loading && (
                            <div className="chat chat-start">
                                <div className="chat-bubble">
                                    <span className="loading loading-dots loading-md"></span>
                                </div>
                            </div>
                        )}
                        <div ref={bottomRef}></div>
                    </div>
                )}
            </div>
            <ChatInput onSend={sendMessage} disabled={loading}/>
        </div>
    );
};

export default ChatWindow;