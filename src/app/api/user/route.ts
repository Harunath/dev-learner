import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		// Get session from the request
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			// If no session exists or no user is logged in, return an unauthorized response
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Fetch user from database using session data
		const user = await client.user.findFirst({
			where: { email: session.user.email },
		});

		if (!user) {
			// If user does not exist, return a not found response
			return NextResponse.json({ error: "User not found" }, { status: 404 });
		}

		// Return the user data as a response
		return NextResponse.json(user);
	} catch (e) {
		// Return a server error response in case of any errors
		console.error(e);
		return NextResponse.json(
			{ error: "Internal Server Error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect(); // Ensure database connection is closed
	}
}
