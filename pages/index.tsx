import Markdown from '../components/Markdown';
import {getWelcomeContent} from '../fileutils/fileUtils';
import {InferGetStaticPropsType} from 'next';

export async function getStaticProps() {
    return {
        props: {content: getWelcomeContent()},
    };
}

export default function Home(props: InferGetStaticPropsType<typeof getStaticProps>) {
    return (
        <div className='flex w-full justify-center'>
            <div id='contentContainer'>
                <h2>Welcome</h2>
                <h4>My name is Daniel Herrera</h4>
                <p>
                    I'm a software engineer with three years of professional experience, most
                    of that time was spent writing Java and TypeScript, but I love exploring new
                    languages and paradigms.
                </p>
                <br/>
                <h2>Active Projects</h2>
                <p>hello</p>
            </div>
        </div>
    );
};
