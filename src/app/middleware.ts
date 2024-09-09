import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function middleware(req: NextRequest) {
	const session = await getServerSession(authOptions);
	if (session.user.id) {
		if (req.nextUrl.pathname.endsWith("signin")) {
			console.log(req.nextUrl.pathname.endsWith("signin"));
			return NextResponse.rewrite(new URL("/", req.url));
		} else if (
			req.nextUrl.pathname.startsWith("admin") &&
			session.user.role == "ADMIN"
		) {
			return NextResponse.next();
		} else if (
			req.nextUrl.pathname.startsWith("instructor") &&
			session.user.role == "INSTRUCTOR"
		) {
			return NextResponse.next();
		}
	} else {
		return NextResponse.redirect(new URL("/api/auth/nextauth", req.url));
	}
	return NextResponse.next();
}

export const config = {
	path: "/api/:path*",
};
