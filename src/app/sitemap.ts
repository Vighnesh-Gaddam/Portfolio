import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  // const baseUrl = 'https://vighnesh-dev.vercel.app'
  const baseUrl = 'https://whoisvighnesh.in'

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ]
}