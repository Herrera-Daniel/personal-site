import { useRouter } from 'next/router';
import { getBlogs, getBlogDirs, getBlog } from '../../../../fileutils/fileUtils';
import { InferGetStaticPropsType } from 'next';
import Markdown from '../../../../components/Markdown';

export async function getStaticProps(context: any) {
    context.q
    return {
        props: { blog: getBlog(context.params.dir, context.params.name) },
    };
}

export async function getStaticPaths() {
    let paths: any = [];
    const blogDirs = getBlogDirs();
    blogDirs.forEach(d => {
        const blogPaths = getBlogDirs(d);
        blogPaths.forEach(b => {
            paths = [...paths, { params: { dir: d, name: b }}];
        });
    });
    return {
        paths: paths,
        fallback: false,
    };
}

export default function Blog({blog}: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Markdown>
            {blog}
        </Markdown>
    );
};
