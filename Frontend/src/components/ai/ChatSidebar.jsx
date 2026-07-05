import { motion, AnimatePresence } from "framer-motion";
import { Plus, PanelLeftClose, MessageSquare } from "lucide-react";

const ChatSidebar = ({ sidebarOpen, setSidebarOpen }) => {

    return (
        <AnimatePresence>
            {sidebarOpen && (
                <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 300, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="border-r border-base-300 flex flex-col overflow-hidden"
                >
                    <div className="flex items-center justify-between p-4">
                        <button className="btn btn-primary flex-1">
                            <Plus size={18} />
                            New Chat
                        </button>
                        <button
                            className="btn btn-ghost btn-square ml-2"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <PanelLeftClose size={20} />
                        </button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-3 space-y-2">
                        <div className="rounded-xl bg-base-200 hover:bg-base-300 transition p-4 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} />
                                <div>
                                    <p className="font-medium">DSA Roadmap</p>
                                    <p className="text-xs opacity-60">Today</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl hover:bg-base-200 transition p-4 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} />
                                <div>
                                    <p className="font-medium">React Interview</p>
                                    <p className="text-xs opacity-60">Yesterday</p>
                                </div>
                            </div>
                        </div>

                        <div className="rounded-xl hover:bg-base-200 transition p-4 cursor-pointer">
                            <div className="flex items-center gap-3">
                                <MessageSquare size={18} />
                                <div>
                                    <p className="font-medium">OS Questions</p>
                                    <p className="text-xs opacity-60">Last Week</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </motion.div>

            )}

        </AnimatePresence>

    );

};

export default ChatSidebar;