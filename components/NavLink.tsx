import Link from "next/link";
import {useRouter} from "next/router";

type NavLinkProps = {
    text: string;
    href: string;
}
export default function NavLink(props: NavLinkProps) {

    const route = useRouter().asPath;

    return (
        <li className={route === props.href ? 'text-gray-400' : 'text-white'}>
            <Link href={props.href}>
                {props.text}
            </Link>
        </li>
    );
};
