type ModalProps = {
    open: boolean;
    onClose: () => void;
}
export const Modal = (props: ModalProps) => {
    if (!props.open) {
        return null;
    }

    return (
        <div className='fixed top-0 bottom-0 left-0 right-0'>
            <div className='rounded max-h-500px max-w-300px m-auto'>
                this is a modal
            </div>
        </div>
    );
};
