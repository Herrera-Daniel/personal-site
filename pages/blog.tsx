import {useRouter} from 'next/navigation';
import {Tab, TabList, TabPanel, Tabs} from "react-tabs";
import { useState } from 'react';
import BlogTitleCard from '../components/BlogTitleCard';
import { getBlogCardDetails } from '../fileutils/fileUtils';

export async function getStaticProps() {
    return {
        props: {blogs: getBlogCardDetails()},
    };
}

export default function Blogs(props: any) {
    const [selectedTab, setSelectedTab] = useState('fishing');
    const router = useRouter();

    console.log(props);

    const getBlogs = (key: string) => {
        return props.blogs[key].map((k: any) => {
            return (
                <BlogTitleCard key={k.href + '/' + k.title} blog={k}/>
            );
        });
    }

    return (
        <div className='flex flex-col h-full'>
            <div className='m-4'>
                Welcome to the blog.
                <br/>
                <div className='pl-4'>
                    Here you can find updates on my projects, some tech
                    discussions,
                    random posits on life, and definitely some posts on fishing.
                </div>
            </div>
            <div className='w-full flex justify-center h-full'>
                <Tabs className='w-2/3'>
                    <TabList className='flex flex-row gap-4 px-2 mb-6 border-b-2 border-slate-700'>
                        {Object.keys(props.blogs)
                            .map(b => (
                                <Tab
                                    key={b}
                                    onClick={() => setSelectedTab(b)}
                                    className={selectedTab === b ?
                                        'bg-slate-700 rounded-t p-2 outline-none cursor-pointer' :
                                        'p-2 outline-none cursor-pointer'}
                                >
                                    {b.charAt(0).toUpperCase() + b.slice(1)}
                                </Tab>
                            ))}
                    </TabList>
                    <div className='flex flex-col justify-center'>
                        {Object.keys(props.blogs)
                            .map(b => (
                                <TabPanel key={b} className='m-auto w-2/3'>
                                    {getBlogs(b)}
                                </TabPanel>
                            ))}
                    </div>
                </Tabs>
            </div>
        </div>
    );
};
