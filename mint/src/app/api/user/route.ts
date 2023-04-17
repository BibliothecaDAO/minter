import { NextResponse, NextRequest } from "next/server";


export async function POST(request: NextRequest) {
    const query: any = await request.json()

    console.log("query", query)
    try {
        const res = await fetch(`http://0.0.0.0:8000/user/${query.username}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
        const data: any = await res.json()

        console.log(data)
        return NextResponse.json(data)
    } catch (error) {
        return NextResponse.json({ message: 'Internal server error' })
    }
}