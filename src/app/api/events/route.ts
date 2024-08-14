import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    return NextResponse.json(
      { success: `${body.eventName} event logged successfully` },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error logging event:", error);
    return NextResponse.json(
      { error: "Something went wrong" },
      { status: 405 } 
    );
  }
}
