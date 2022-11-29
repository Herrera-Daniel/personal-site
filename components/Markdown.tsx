import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import remarkGfm from 'remark-gfm';
import { darkTheme } from '../codehighlightertheme/theme';

export type BlogType = {
    title: string;
    desc: string;
    content: string;
    dir: string;
    name: string;
};

export default function Markdown({ children }: any) {

    return (
        <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            className='h-full w-full overflow-scroll p-2 rounded break-words'
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
    );
}
