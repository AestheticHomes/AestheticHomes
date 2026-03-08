/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://aesthetichomes.co.in',
  generateRobotsTxt: false,
  outDir: 'public',
  changefreq: 'weekly',
  priority: 0.7,
  transform: async (config, path) => {
    const customPriority = path === '/' ? 1.0 : path === '/projects' || path === '/services' ? 0.9 : 0.8
    return {
      loc: path,
      changefreq: config.changefreq,
      priority: customPriority,
      lastmod: new Date().toISOString(),
      alternateRefs: [],
    }
  },
}
