import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const base = process.env.API_ENDPOINT;
  if (!base) {
    console.error("Missing API_ENDPOINT env var");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const url = new URL("/api/cart", base);
  const sessionId = req.headers.get("X-Session-Id") || "";

  try {
    const response = await fetch(url, {
      headers: {
        "X-Session-Id": sessionId,
      },
    });
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'private, no-cache, must-revalidate'
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch cart" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  const base = process.env.API_ENDPOINT;
  if (!base) {
    console.error("Missing API_ENDPOINT env var");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const url = new URL("/api/cart", base);
  const sessionId = req.headers.get("X-Session-Id") || "";

  try {
    const body = await req.json();
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Session-Id": sessionId,
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to add item to cart, response: ${err}`);
    }

    const data = await response.json();
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'private, no-cache, must-revalidate'
      }
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to add item to cart" },
      { status: 500 }
    );
  }
}
