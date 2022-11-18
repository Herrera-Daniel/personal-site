import {auth} from "../../firebase";
import {useState} from "react";
import {User} from "@firebase/auth";
import {useRouter} from "next/navigation";
import Button from "../../components/Button";

export default function Blog() {

    const [user, setUser] = useState<User | null>(null);
    const navigate = useRouter();

    auth.onAuthStateChanged(user => setUser(user));

    return (
        <div className='flex flex-col'>
            {!user && <Button text='Sign In' onClick={() => navigate.push('/blog/sign')}/>}
            {user && <Button text='Add Blog' onClick={() => navigate.push('/blog/add')}/>}
                <div>
                I think I want to start writing. About everything, tech, life,
                mental state. No ones gonna read it anyway.
            </div>

        </div>
    );
};
