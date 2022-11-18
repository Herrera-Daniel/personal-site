import ReactMarkdown from "react-markdown";

type EditorProps = {
    markDown: string;
    setMarkDown: (markDown: string) => void;
}

export default function Editor(props: EditorProps) {

    return (
        <div className='h-full flex flex-col gap-2'>
            <ReactMarkdown className='h-1/2 overflow-scroll'>
                {props.markDown}
            </ReactMarkdown>
            <textarea
                onChange={e => props.setMarkDown(e.target.value)}
                className='h-1/2 overflow-scroll'
            >

        </textarea>
        </div>
    );
}
