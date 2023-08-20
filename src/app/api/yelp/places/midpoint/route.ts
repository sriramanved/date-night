export async function GET(req: Request) {
    const url = new URL(req.url)
    const term = await url.searchParams.get('term');
}