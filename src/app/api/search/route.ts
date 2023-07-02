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
  })

  const posts = await db.post.findMany({
    where: {
      title: {
        contains: q,
      },
    },
    take: 10,
  })

  return new Response(JSON.stringify({ communities, posts }))
}
