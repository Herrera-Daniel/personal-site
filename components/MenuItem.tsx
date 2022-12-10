type MenuItemProps = {
    href: string;
    text: string;
}
export default function MenuItem(props: MenuItemProps) {
    return (
        <li>
            <a
                className='dropdown-item text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent text-white bg-gray-700 active:bg-gray-800 z-50'
                href={props.href}
            >
                {props.text}
            </a>
        </li>
    );
}