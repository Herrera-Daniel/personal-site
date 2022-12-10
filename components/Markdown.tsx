import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { darkTheme } from '../codehighlightertheme/theme';
import toc from "@jsdevtools/rehype-toc";
import rehypeSlug from "rehype-slug";

export default function Markdown({ children }: any) {

    return (
        <div id="contentContainer">
            <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeSlug, toc]}
                className='h-full rounded text-left whitespace-normal break-words'
                components={{
                    code({ node, inline, className, children, ...props }) {
                        const match = /language-(\w+)/.exec(className || '');
                        return !inline && match ? (
                            <SyntaxHighlighter
                                style={darkTheme as any}
                                showLineNumbers={true}
                                language={match[1]}
                                {...props}
                            >
                                {String(children).replace(/\n$/, '')}
                            </SyntaxHighlighter>
                        ) : (
                            <code className={className} {...props}>
                                {children}
                            </code>
                        );
                    },
                }}
            >
                {children}
            </ReactMarkdown>
        </div>
    );
}
