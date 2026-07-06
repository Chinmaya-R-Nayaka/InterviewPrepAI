import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { Copy, Check } from "lucide-react";
import { useState } from "react";

const MarkdownMessage = ({ content }) => {
    const [copied, setCopied] = useState(false);

    return(
        <div className="leading-8 text-[16px]">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                    h1: ({ children }) => (
                        <h1 className="text-3xl font-bold my-5">{children}</h1>
                    ),
                    h2: ({ children }) => (
                        <h2 className="text-2xl font-bold my-4">{children}</h2>
                    ),
                    h3: ({ children }) => (
                        <h3 className="text-xl font-semibold my-4">{children}</h3>
                    ),
                    p: ({ children }) => (
                        <p className="mb-4">{children}</p>
                    ),
                    ul: ({ children }) => (
                        <ul className="list-disc pl-6 mb-4">{children}</ul>
                    ),
                    ol: ({ children }) => (
                        <ol className="list-decimal pl-6 mb-4">{children}</ol>
                    ),
                    li: ({ children }) => (
                        <li className="mb-2">{children}</li>
                    ),
                    code({ inline, className, children }) {
                        const match = /language-(\w+)/.exec(className || "");
                        if(inline){
                            return(
                                <code className="bg-base-300 rounded px-1">{children}</code>
                            );
                        }

                        return(
                            <div className="rounded-xl overflow-hidden my-5 border border-base-300">
                                <div className="bg-base-300 px-4 py-2 flex justify-between items-center">
                                    <span className="text-sm opacity-70">
                                        {match ? match[1].toUpperCase() : "CODE"}
                                    </span>
                                    <CopyToClipboard
                                        text={String(children)}
                                        onCopy={() => {
                                            setCopied(true);
                                            setTimeout(() => {
                                                setCopied(false);
                                            }, 1500);
                                        }}
                                    >
                                        <button className="btn btn-xs">
                                            {copied ? (<Check size={15} />) : (<Copy size={15} />)}
                                        </button>
                                    </CopyToClipboard>
                                </div>
                                <SyntaxHighlighter
                                    language={match?.[1] || "cpp"} style={atomOneDark}
                                    customStyle={{margin: 0, padding: "20px", fontSize: "15px"}}
                                >
                                {String(children).replace(/\n$/, "")}
                                </SyntaxHighlighter>
                            </div>
                        );
                    },
                }}
            >
            {content}
            </ReactMarkdown>
        </div>
    );
};

export default MarkdownMessage;