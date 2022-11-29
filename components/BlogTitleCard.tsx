import {BlogType} from './Markdown';
import Link from "next/link";

type BlogTitleProps = {
    blog: BlogType;
};

export default function BlogTitleCard(props: BlogTitleProps) {
    console.log(props.blog);
    return (
        <div className='border-2 p-2 border-white rounded h-1/5'>
            <Link
                className='text-cyan-300 cursor-pointer'
                href={{
                    pathname: '/blog/[dir]/[name]',
                    query: {dir: props.blog.dir, name: props.blog.name}
                }}
                as={'/blog/' + props.blog.dir + '/' + props.blog.name}
            >
                {props.blog.title}
            </Link>
            <div>
                {props.blog.desc}
            </div>
        </div>
    );
};
