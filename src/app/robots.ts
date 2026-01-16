import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/', // If you ever add a private admin area
    },
    sitemap: 'https://vighneshgaddam.com/sitemap.xml',
  }
}