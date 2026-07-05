import { useState } from "react";
import ChatSidebar from "../components/ai/ChatSidebar";
import ChatWindow from "../components/ai/ChatWindow";

const AIAssistant = () => {

    const [sidebarOpen, setSidebarOpen] = useState(true);

    return (

        <div className="relative h-[calc(100vh-110px)] rounded-2xl overflow-hidden border border-base-300 bg-base-100 flex">

            <ChatSidebar
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

            <ChatWindow
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />

        </div>

    );

};

export default AIAssistant;