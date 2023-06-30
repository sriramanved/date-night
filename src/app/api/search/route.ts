import { db } from '@/lib/db'

export async function GET(req: Request) {
  const url = new URL(req.url)
  const q = url.searchParams.get('q')

  if (!q) return new Response('Invalid query', { status: 400 })

  const communities = await db.subreddit.findMany({
    where: {
      name: {
        startsWith: q,
      },
    },
    include: {
      _count: true,
    },
    take: 3,
  })

  const posts = await db.post.findMany({
    where: {
      title: {
        startsWith: q,
      },
    },
    take: 3,
  })

  return new Response(JSON.stringify({ communities, posts }))
}
