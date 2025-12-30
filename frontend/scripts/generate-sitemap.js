const { SitemapStream } = require('sitemap');
const { createWriteStream } = require('fs');

// List static routes you want in the sitemap. Add dynamic routes generation if needed.
const pages = [
    '/',
    '/home',
    '/dashboard',
    '/collections',
    '/login',
    '/register'
];

const hostname = 'https://sortedlinks.vercel.app';
const sitemapPath = './public/sitemap.xml';

const sitemap = new SitemapStream({ hostname });
const writeStream = createWriteStream(sitemapPath);

sitemap.pipe(writeStream);

pages.forEach((p) => {
    sitemap.write({ url: p, changefreq: 'weekly', priority: 0.7 });
});

sitemap.end();

writeStream.on('finish', () => {
    console.log(`Sitemap written to ${sitemapPath}`);
});
