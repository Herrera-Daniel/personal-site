type ButtonProps = {
    text: string;
    onClick: () => void;
};

export default function Button(props: ButtonProps) {
    return (
        <button
            className='ml-auto my-auto h-12 px-6 py-2.5 text-white font-medium text-xs leading-tight uppercase overflow-scroll rounded shadow-md hover:bg-gray-800 hover:shadow-lg focus:bg-gray-800 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-gray-800 active:shadow-lg transition duration-150 ease-in-out'
            onClick={() => props.onClick()}
        >
            {props.text}
        </button>
    );

};
