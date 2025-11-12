import fs from 'fs';

const fileName = './static/news/news.html';

export default async function handler(req, res) {
    res.setHeader('Content-Type', 'text/html; charset=UTF-8');
    res.write(await fs.readFileSync(fileName, 'utf8'));
    res.end();
}