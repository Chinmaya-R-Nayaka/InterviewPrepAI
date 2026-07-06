import { PanelGroup, Panel, PanelResizeHandle } from "react-resizable-panels";
import QuestionPanel from "./QuestionPanel";
import CodeEditor from "./CodeEditor";
import BottomPanel from "./BottomPanel";

const InterviewScreen = ({ interview }) => {

    return(
        <div className="h-[calc(100vh-110px)] rounded-2xl overflow-hidden border border-base-300">
            <PanelGroup direction="vertical">
                <Panel defaultSize={78}>
                    <PanelGroup direction="horizontal">
                        <Panel defaultSize={40} minSize={25}>
                            <QuestionPanel interview={interview} />
                        </Panel>
                        <PanelResizeHandle className="w-2 bg-base-300 hover:bg-primary transition-colors cursor-col-resize" />
                        <Panel defaultSize={60} minSize={35}>
                            <CodeEditor interview={interview} />
                        </Panel>
                    </PanelGroup>
                </Panel>
                <PanelResizeHandle className="h-2 bg-base-300 hover:bg-primary cursor-row-resize transition-colors" />
                <Panel defaultSize={22} minSize={15}>
                    <BottomPanel interview={interview} />
                </Panel>
            </PanelGroup>
        </div>
    );
};

export default InterviewScreen;