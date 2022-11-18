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
            <Button text='Save' onClick={() => onSave()}/>
            <Editor markDown={markDown} setMarkDown={setMarkDown}/>
        </div>

    );
};
