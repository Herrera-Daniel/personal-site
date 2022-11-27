import { BlogType } from './Editor';

type BlogTitleProps = {
    blog: BlogType;
};

export default function BlogTitleCard(props: BlogTitleProps) {
    console.log(props.blog);
    return (
        <div className='border-2 p-2 border-white rounded h-1/5'>
            <a className='text-cyan-300 cursor-pointer' href={`/blog/${props.blog.href}/`}>
                {props.blog.title}
            </a>
            <div>
                {props.blog.desc}
            </div>
        </div>
    );
};
