import ReactMarkdown from "react-markdown";
import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import remarkGfm from "remark-gfm";
import {darkTheme} from "../codehighlightertheme/theme";

type EditorProps = {
    markDown: string;
    setMarkDown: (markDown: string) => void;
}

export default function Editor(props: EditorProps) {

    return (
        <div id='editor' className='h-full flex flex-row gap-2 pt-4'>
            <textarea
                onChange={e => props.setMarkDown(e.target.value)}
                placeholder='Write your blog here!'
                className='h-full w-1/2 overflow-scroll rounded p-2 outline-none'
            />
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                className='h-full w-1/2 overflow-scroll bg-gray-800 p-2 rounded'
                components={{
                    code({node, inline, className, children, ...props}) {
                        const match = /language-(\w+)/.exec(className || "");
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={darkTheme as any}
                                showLineNumbers={true}
                                language={match[1]}
                                {...props}
                            >
                                {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {props.markDown}
            </ReactMarkdown>
        </div>
    );
}
