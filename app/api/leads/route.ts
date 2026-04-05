export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  return Response.json({
    ok: true,
    message: 'Lead endpoint placeholder ready for webhook integration.',
    received: payload
  });
}
