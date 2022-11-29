import fs from 'fs';

export function getBlogDirs(dir?: string) {
    const dirPath = dir ?
        process.cwd() + '/blogs/' + dir :
        process.cwd() + '/blogs';
    return fs.readdirSync(dirPath);
}

export function getBlogs() {
    const rootDirs = getBlogDirs();
    console.log(rootDirs);
    let data = {};

    rootDirs.forEach(d => {
        const blogDirs = getBlogDirs(d);
        console.log(blogDirs);

        data = {
            ...data,
            [d]: blogDirs.map(b => {
                const dirPath = process.cwd() +
                    '/blogs/' +
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
}

export function getBlog(dir: string, name: string) {

    return fs.readFileSync(process.cwd() + '/blogs/' + dir + '/' + name + '/' + name + '.md', 'utf8');
}
