import Editor from "../../components/Editor";
import Button from "../../components/Button";
import {db} from "../../firebase";
import {ref, set} from "@firebase/database";
import {useState} from "react";

export default function Add() {
    const [markDown, setMarkDown] = useState('');
    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');

    const onSave = () => {
        set(ref(db, 'blogs/'), {
            title: title,
            content: markDown,
            description: desc
        });
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='flex flex-row gap-2'>
                <div className='flex flex-col gap-2 w-1/2'>
                    <input
                        className='flex items-center h-12 w-full rounded p-2 outline-none'
                        onChange={e => setTitle(e.target.value)}
                        placeholder='Title'
                    />
                    <textarea
                        className='p-2 rounded outline-none'
                        onChange={e => setDesc(e.target.value)}
                        placeholder='Desc'
                    />
                </div>
                <Button text='Save' onClick={() => onSave()}/>
            </div>
            <Editor markDown={markDown} setMarkDown={setMarkDown}/>
        </div>

    );
};
