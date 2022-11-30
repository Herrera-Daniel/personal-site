import Markdown from '../components/Markdown';
import { getAboutContent } from '../fileutils/fileUtils';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
    return {
        props: { content: getAboutContent() },
    };
}

export default function About(props: InferGetStaticPropsType<typeof getStaticProps>) {

    return (
        <div className='flex w-full justify-center'>
            <Markdown>
                {props.content}
            </Markdown>
        </div>
    );
};
