import Markdown from '../components/Markdown';
import { getWelcomeContent } from '../fileutils/fileUtils';
import { InferGetStaticPropsType } from 'next';

export async function getStaticProps() {
    return {
       props: {content: getWelcomeContent()}
    }
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <Markdown>
            {props.content}
        </Markdown>
    )
}
