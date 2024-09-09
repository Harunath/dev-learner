import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		// Get session from the request
		const session = await getServerSession(authOptions);

		if (!session || !session.user) {
			// If no session exists or no user is logged in, return an unauthorized response
			return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
		}

		console.log(session.user);

		// Get the user ID from the session
		const userId = parseInt(session.user.id, 10);

		// Parse the request body to get the course ID
		const { courseId } = await req.json();

		// Check if the course exists
		const course = await client.course.findUnique({
			where: { id: courseId },
		});

		if (!course) {
			return NextResponse.json({ error: "Course not found" }, { status: 404 });
		}

		// Check if the user is already enrolled in the course
		const isEnrolled = await client.user.findFirst({
			where: {
				id: userId,
				courses: {
					some: {
						id: courseId,
					},
				},
			},
		});

		if (isEnrolled) {
			return NextResponse.json(
				{ error: "Already enrolled in this course" },
				{ status: 400 }
			);
		}

		// TODO: Add payment processing here
		// Example: await processPayment(userId, course.price);

		// Enroll the user in the course
		await client.user.update({
			where: { id: userId },
			data: {
				courses: {
					connect: { id: courseId },
				},
			},
		});

		return NextResponse.json(
			{ message: "Course purchased successfully" },
			{ status: 200 }
		);
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
