import {auth} from "../../firebase";
import {useState} from "react";
import {User} from "@firebase/auth";
import {useRouter} from "next/navigation";

export default function Blog() {

    const [user, setUser] = useState<User | null>(null);
    const navigate = useRouter();

    auth.onAuthStateChanged(user => setUser(user));

    return (
            <div className='flex flex-col'>
                {!user &&
                    <button
                        className='ml-auto'
                        onClick={() => navigate.push('/blog/signin')}
                    >Sign In</button>}
                {user &&
                    <button
                        className='ml-auto'
                        onClick={() => navigate.push('/blog/add')}
                    >Add Blog</button>}
                <div>
                    I think I want to start writing. About everything, tech, life, mental state. No ones gonna read it anyway.
                </div>

            </div>
    );
};
