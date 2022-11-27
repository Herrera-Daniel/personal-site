import { useRouter } from 'next/navigation';
import fs from 'fs';
import BlogTitleCard from '../../components/BlogTitleCard';
import { BlogType } from '../../components/Editor';

export async function getStaticProps(context: any) {

    const cwd = process.cwd();
    const dirContent = fs.readdirSync(cwd + '/blogs');
    const blogs = dirContent.map(d => {
        const blogDetails = JSON.parse(fs.readFileSync(cwd + '/blogs/' + d + '/' + d + '.json', 'utf8'));
        console.log(blogDetails);
        return {
            title: blogDetails.title,
            desc: blogDetails.desc,
            content: fs.readFileSync(cwd + '/blogs/' + d + '/' + d + '.md', 'utf8'),
            href: d
        } as BlogType;
    });
    return {
        props: { files: blogs },
    };
}

export default function Blog(props: any) {
    const router = useRouter();

    const blogs = props.files.map((k: any) => {
        return (
            <BlogTitleCard key={k.title} blog={k}/>
        );
    });
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
                <div className='grid gap-2 grid-cols-3 w-2/3 h-full'>
                    {blogs}
                </div>
            </div>
        </div>
    );
};
