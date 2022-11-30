import NavLink from './NavLink';
import Head from 'next/head';
import Link from 'next/link';
import Menu from './Menu';

export default function Layout({ children }: any) {

    return (

        <div className='h-screen flex flex-col overflow-scroll'>
            <Head>
                <title>Daniel Herrera</title>
                <meta
                    name='description'
                    content='Personal Site for Daniel Herrera'
                />
            </Head>
            <nav className='flex flex-row items-center relative bg-gray-800 p-4 h-14 w-full'>
                <Link href='/' className='justify-start'>Daniel Herrera</Link>

                <div id='desktopNav'>
                    <ul className='flex flex-row gap-2 ml-auto'>
                        <NavLink href='/' text='Home'/>
                        <NavLink href='/blog' text='Blog'/>
                        <NavLink href='/about' text='About'/>
                        <NavLink href='/contact' text='Contact'/>
                    </ul>
                </div>
                <div id='mobileNav'>
                    <Menu/>
                </div>
            </nav>

            <main className='flex-grow p-6'>{children}</main>

            <footer className='grid grid-cols-2 justify-center items-center gap-4 bottom-0 bg-gray-800 h-14 p-4 w-full'>
                <div className='flex gap-2'>
                    <a>
                        github
                    </a>
                    <a>
                        linkedin
                    </a>
                </div>
                <div className='flex w-full justify-end'>
                    Built with <a href='https://nextjs.org/'>NextJs</a>
                </div>
            </footer>
        </div>
    );
};
