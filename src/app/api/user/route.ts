import { NextResponse } from "next/server";

export function GET() {
	NextResponse.json({ msg: "hit routre successful" });
}
