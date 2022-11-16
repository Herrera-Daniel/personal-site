import {useState} from "react";
import {useRouter} from "next/navigation";
import {signInWithEmailAndPassword} from "@firebase/auth";
import {auth} from "../../firebase";

export default function Signin() {
    const [signIn, setSignIn] = useState({email: '', password: ''});
    const navigate = useRouter();

    const onSignIn = () => {
        signInWithEmailAndPassword(auth, signIn.email, signIn.password)
            .then(() => navigate.push('/blog'))
            .catch(() => alert("Sorry, this login is only for me.", ));
    }
    return (
        <div className='flex flex-col items-center gap-4'>
            <div className='flex flex-col gap-2'>
                Email
                <input
                    type='email'
                    className='w-50'
                    onChange={e => setSignIn({
                        ...signIn,
                        email: e.target.value
                    })}
                />
            </div>
            <div className='flex flex-col gap-2'>
                Password
                <input
                    type='password'
                    className='w-50'
                    onChange={e => setSignIn({
                        ...signIn,
                        password: e.target.value
                    })}
                />
            </div>
            <button onClick={onSignIn} className='rounded border-2 w-1/6'>
                Sign In
            </button>
        </div>
    );
};
