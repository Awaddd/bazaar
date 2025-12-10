import { NextRequest, NextResponse } from "next/server";

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const base = process.env.API_ENDPOINT;
  if (!base) {
    console.error("Missing API_ENDPOINT env var");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const url = new URL(`/api/cart/${id}`, base);

  try {
    const body = await req.json();
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to update cart item, response: ${err}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to update cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const base = process.env.API_ENDPOINT;
  if (!base) {
    console.error("Missing API_ENDPOINT env var");
    return NextResponse.json(
      { error: "Server misconfiguration" },
      { status: 500 }
    );
  }

  const { id } = await params;
  const url = new URL(`/api/cart/${id}`, base);

  try {
    const response = await fetch(url, {
      method: "DELETE",
    });

    if (!response.ok) {
      const err = await response.text();
      throw new Error(`Failed to delete cart item, response: ${err}`);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to delete cart item" },
      { status: 500 }
    );
  }
}
