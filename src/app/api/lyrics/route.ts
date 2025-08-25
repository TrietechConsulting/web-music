// app/api/lyrics/route.ts
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const lrcUrl = searchParams.get("url");

    if (!lrcUrl) {
      return new NextResponse("Missing URL parameter", { status: 400 });
    }

    const response = await fetch(lrcUrl);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const text = await response.text();

    return new NextResponse(text, {
      headers: {
        "Content-Type": "text/plain",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "public, max-age=3600", // Cache for 1 hour
      },
    });
  } catch (error) {
    console.error("Error fetching lyrics:", error);
    return new NextResponse("Failed to fetch lyrics", { status: 500 });
  }
}
