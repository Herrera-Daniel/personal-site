import MenuItem from './MenuItem';

export default function Menu() {

    const onBlur = (e: HTMLDivElement) => {
        e.setAttribute('data-clicked', 'false');
    };

    const onClick = (e: HTMLDivElement) => {
        if (e.getAttribute('data-clicked') === 'true') {
            document.getElementById('dropdownMenuButton')!.blur();
        }
        e.setAttribute('data-clicked', e.getAttribute('data-clicked') === 'true' ? 'false' : 'true');
    };

    return (
        <div className='flex justify-center ml-auto'>
            <div>
                <div
                    data-clicked='false'
                    className='dropdown relative'
                    onClick={e => onClick(e.currentTarget)}
                >
                    <button
                        className='
          dropdown-toggle
          px-6
          py-2.5
          bg-slate-600
          text-white
          font-medium
          text-xs
          leading-tight
          uppercase
          rounded
          shadow-md
          focus:bg-slate-700 focus:shadow-lg focus:outline-none focus:ring-0
          transition
          duration-150
          ease-in-out
          flex
          items-center
          whitespace-nowrap
        '
                        type='button'
                        id='dropdownMenuButton'
                        aria-expanded='false'
                    >
                        Menu
                    </button>
                    <ul
                        id='menuContainer'
                        className='
          dropdown-menu
          min-w-max
          absolute
          bg-gray-700
          text-base
          z-40
          float-left
          py-2
          list-none
          text-left
          rounded-lg
          shadow-lg
          mt-1
          m-0
          bg-clip-padding
          border-none
        '
                        aria-labelledby='dropdownMenuButton1'
                    >
                        <MenuItem href='/' text='Home'/>
                        <MenuItem href='/blog' text='Blog'/>
                        <MenuItem href='/about' text='About'/>
                        <MenuItem href='/contact' text='Contact'/>
                    </ul>
                </div>
            </div>
        </div>
    );
};