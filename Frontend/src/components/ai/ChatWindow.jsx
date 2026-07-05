import { useState } from "react";
import ChatInput from "./ChatInput";
import EmptyChat from "./EmptyChat";
import { chatWithAI } from "../../services/aiService";
import MarkdownMessage from "./MarkdownMessage";

const ChatWindow = () => {

    const [messages, setMessages] = useState([]);

    const sendMessage = async (text) => {

        if (!text.trim()) return;

        setMessages(prev => [
            ...prev,
            {
                role: "user",
                text,
            },
        ]);

        const reply = await chatWithAI(text);

        setMessages(prev => [
            ...prev,
            {
                role: "assistant",
                text: reply,
            },
        ]);

    };

    return (

        <div className="flex-1 flex flex-col">

            <div className="flex-1 overflow-y-auto p-8">

                {

                    messages.length === 0 ?

                        <EmptyChat />

                        :

                        <div className="space-y-6">

                            {

                                messages.map((msg, i) => (

                                    <div
                                        key={i}
                                        className={`chat ${msg.role === "user"
                                                ? "chat-end"
                                                : "chat-start"
                                            }`}
                                    >

                                        <div
                                            className={`chat-bubble ${
                                                msg.role === "user"
                                                    ? "chat-bubble-primary"
                                                    : ""
                                            }`}
                                        >

                                            <MarkdownMessage content={msg.text} />

                                        </div>

                                    </div>

                                ))

                            }

                        </div>

                }

            </div>

            <ChatInput
                onSend={sendMessage}
            />

        </div>

    );

};

export default ChatWindow;