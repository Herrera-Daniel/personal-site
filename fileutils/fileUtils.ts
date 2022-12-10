import fs from 'fs';

export function getBlogDirs(dir?: string) {
    const dirPath = dir ?
        process.cwd() + '/staticdata/blogs/' + dir :
        process.cwd() + '/staticdata/blogs';
    return fs.readdirSync(dirPath);
}

export function getBlogCardDetails() {
    let data = {};

    try {
        const rootDirs = getBlogDirs();
        rootDirs.forEach(d => {
            const blogDirs = getBlogDirs(d);

            data = {
                ...data,
                [d]: blogDirs.map(b => {
                    const dirPath = process.cwd() +
                        '/staticdata/blogs/' +
                        d +
                        '/' +
                        b +
                        '/' +
                        b;

                    const blogDetails = JSON.parse(fs.readFileSync(dirPath +
                        '.json', 'utf8'));
                    return {
                        title: blogDetails.title,
                        desc: blogDetails.desc,
                        content: fs.readFileSync(dirPath + '.md', 'utf8'),
                        dir: d,
                        name: b,
                    };
                }),
            };
        });
        return data;
    } catch (e) {
        return {};
    }

}

export function getBlog(dir: string, name: string) {

    return fs.readFileSync(process.cwd() +
        '/staticdata/blogs/' +
        dir +
        '/' +
        name +
        '/' +
        name +
        '.md', 'utf8');
}

export function getAboutContent() {

    return fs.readFileSync(process.cwd() + '/staticdata/about.md', 'utf8');
}

export function getWelcomeContent() {

    return fs.readFileSync(process.cwd() + '/staticdata/welcome.md', 'utf8');
}
