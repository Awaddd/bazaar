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

  const apiStart = Date.now();

  const url = new URL("/api/products", base);

  req.nextUrl.searchParams.forEach((value, key) => {
    url.searchParams.append(key, value);
  });

  try {
    const response = await fetch(url);
    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to fetch data, response: ${err}`);
    }

    const apiDuration = Date.now() - apiStart;
    console.log(`API route fetch took ${apiDuration}ms`);

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
