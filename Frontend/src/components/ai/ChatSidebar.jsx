import {
    Plus,
    PanelLeftClose,
    PanelLeftOpen,
    MessageSquare,
} from "lucide-react";

const ChatSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    return (

        <div className="h-full border-r border-base-300 bg-base-100 flex flex-col">

            {/* Header */}

            <div className="p-3 flex items-center justify-between">

                {sidebarOpen && (

                    <button className="btn btn-primary flex-1">

                        <Plus size={18} />

                        New Chat

                    </button>

                )}

                <button
                    className="btn btn-ghost btn-square"
                    onClick={() => setSidebarOpen(!sidebarOpen)}
                >

                    {sidebarOpen ? (
                        <PanelLeftClose size={20} />
                    ) : (
                        <PanelLeftOpen size={20} />
                    )}

                </button>

            </div>

            {/* Chat List */}

            {sidebarOpen && (

                <div className="flex-1 overflow-y-auto p-3 space-y-2">

                    <div className="rounded-xl bg-base-200 hover:bg-base-300 transition p-4 cursor-pointer">

                        <div className="flex items-center gap-3">

                            <MessageSquare size={18} />

                            <div>

                                <p className="font-medium">

                                    DSA Roadmap

                                </p>

                                <p className="text-xs opacity-60">

                                    Today

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-xl hover:bg-base-200 transition p-4 cursor-pointer">

                        <div className="flex items-center gap-3">

                            <MessageSquare size={18} />

                            <div>

                                <p className="font-medium">

                                    React Interview

                                </p>

                                <p className="text-xs opacity-60">

                                    Yesterday

                                </p>

                            </div>

                        </div>

                    </div>

                    <div className="rounded-xl hover:bg-base-200 transition p-4 cursor-pointer">

                        <div className="flex items-center gap-3">

                            <MessageSquare size={18} />

                            <div>

                                <p className="font-medium">

                                    OS Questions

                                </p>

                                <p className="text-xs opacity-60">

                                    Last Week

                                </p>

                            </div>

                        </div>

                    </div>

                </div>

            )}

        </div>

    );

};

export default ChatSidebar;