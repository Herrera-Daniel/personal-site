import NavLink from "./NavLink";
import Head from "next/head";

export default function Layout({children}: any) {

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
                <a className='justify-start'>Daniel Herrera</a>

                <ul className='flex flex-row gap-2 ml-auto'>
                    <NavLink href='/' text='Home'/>
                    <NavLink href='/blog' text='Blog'/>
                    <NavLink href='/about' text='About'/>
                    <NavLink href='/contact' text='Contact'/>
                </ul>
            </nav>

            <main className='flex-grow p-8'>{children}</main>

            <footer className='flex items-center bottom-0 bg-gray-800 h-12 p-4 w-full'>footer</footer>
        </div>
    );
};
