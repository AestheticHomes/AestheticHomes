/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://www.aesthetichomes.co.in',
  generateRobotsTxt: false,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  exclude: ['/robots.txt', '/manifest.webmanifest', '/_not-found'],
  transform: async (config, path) => {
    const customPriority = path === '/' ? 1.0 : path === '/projects' || path === '/services' ? 0.9 : path === '/partners' ? 0.7 : 0.8
    const changefreq = path === '/green' ? 'monthly' : config.changefreq
    return {
      loc: path,
      changefreq,
      priority: customPriority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    }
  },
}
