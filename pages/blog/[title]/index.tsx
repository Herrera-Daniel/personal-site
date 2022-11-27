import {useRouter} from "next/router";

export default function Blog() {
    const router = useRouter()
    const {title} = router.query
    return (
        <div>
            Blog: {title}
        </div>
    );
};
