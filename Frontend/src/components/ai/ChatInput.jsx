import { SendHorizontal, Loader2 } from "lucide-react";
import { useState } from "react";

const ChatInput = ({ onSend, loading, disabled }) => {
    const [message, setMessage] = useState("");

    const handleSubmit = () => {
        if (!message.trim() || loading) return;
        onSend(message);
        setMessage("");
    };

    return(
        <div className="border-t border-base-300 p-5">
            <div className="flex gap-3">
                <input className="input input-bordered flex-1" placeholder="Ask your question..."
                    value={message} disabled={disabled}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") handleSubmit();}}
                />
                <button className="btn btn-primary"
                    onClick={handleSubmit} disabled={disabled}>
                    { loading? <Loader2 className="animate-spin" size={20}/> : <SendHorizontal size={20}/> }
                </button>
            </div>
        </div>
    );
};

export default ChatInput;