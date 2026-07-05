import MarkdownMessage from "../ai/MarkdownMessage";
import { BookOpen } from "lucide-react";

const QuestionPanel = ({ interview }) => {

    return (

        <div className="h-full flex flex-col bg-base-100">

            <div className="border-b border-base-300 px-6 py-4 flex items-center gap-3">

                <BookOpen className="text-primary" />

                <h2 className="text-2xl font-bold">

                    Interview Question

                </h2>

            </div>

            <div className="flex-1 overflow-y-auto p-8">

                {

                    interview?.question ?

                        <MarkdownMessage content={interview.question} />

                        :

                        <div className="text-base-content/60">

                            Waiting for question...

                        </div>

                }

            </div>

        </div>

    );

};

export default QuestionPanel;