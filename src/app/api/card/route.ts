import { NextApiRequest, NextApiResponse } from "next";
import { NextRequest, type NextResponse } from "next/server";

export async function GET(req: Request, res: Response) {
  const { searchParams } = new URL(req.url);
  const number = searchParams.get('number');
  const apiKey = process.env.JIBIT_API_KEY as string;
  const secretKey = process.env.JIBIT_SECRET_KEY as string;

  const token = await getAccessToken(apiKey, secretKey);

  if (!token) {
    return new Response('Failed to retrieve access token', {
      status: 500
    });
  }

  const response = await fetch(`https://napi.jibit.ir/ppg/v3/cards?number=${number}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();

  if (!response.ok) {
    return new Response(data, {
      status: response.status
    });
  }
  console.log(data);
  // @ts-ignore
  return Response.json({data}) 
}

async function getAccessToken(apiKey: string, secretKey: string) {
  const response = await fetch('https://napi.jibit.ir/ide/v1/tokens/generate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ apiKey, secretKey })
  });

  const data = await response.json();

  if (response.ok && data.accessToken) {
    return data.accessToken;
  }

  return null;
}
