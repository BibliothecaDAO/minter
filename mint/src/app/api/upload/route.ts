import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
  const query: any = await request.json()

  console.log("query", query)
  try {
    const res = await fetch(process.env.MINTER_API + `upload_image/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      },
      body: JSON.stringify(query)
    });
    const data: any = await res.json()

    console.log(data)
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ message: 'Internal server error' })
  }
}