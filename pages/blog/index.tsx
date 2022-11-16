import {auth} from "../../firebase";
import {useState} from "react";
import {User} from "@firebase/auth";
import {useRouter} from "next/navigation";
import {Modal} from "../../components/Modal";

export default function Blog() {

    const [user, setUser] = useState<User | null>(null);
    const [signIn, setSignIn] = useState({email: '', password: ''});
    const [showSignInModal, setShowSignInModal] = useState(false);
    const navigate = useRouter();

    auth.onAuthStateChanged(user => setUser(user));

    const onShowSignInModal = () => {
        setShowSignInModal(true);
    }

    const onCloseSignInModal = () => {
        setShowSignInModal(false);
    }

    return (
        <>
            <div className='flex flex-col'>
                {!user &&
                    <button
                        className='ml-auto'
                        onClick={onShowSignInModal}
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

            <Modal open={showSignInModal} onClose={onCloseSignInModal}/>
        </>
    );
};
