import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		// Get session from the request
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			// If no session exists or no user is logged in, return an unauthorized response
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		// Retrieve the user's ID from the session
		const userId = parseInt(session.user.id, 10); // Ensure the ID is an integer

		// Fetch the courses where the user is enrolled
		const courses = await client.course.findMany({
			where: {
				students: {
					some: {
						id: userId,
					},
				},
			},
		});

		return NextResponse.json(courses, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect();
	}
}
