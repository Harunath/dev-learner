import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client"; // Assuming you're using Prisma for database

const prisma = new PrismaClient();

// GET: /api/courses/[id]
export async function GET(
	request: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const courseId = parseInt(params.id);

		// Fetch course from the database
		const course = await prisma.course.findUnique({
			where: {
				id: courseId,
			},
		});

		if (!course) {
			return NextResponse.json({ error: "Course not found" }, { status: 404 });
		}

		return NextResponse.json({ course });
	} catch (error) {
		return NextResponse.json(
			{ error: "Failed to fetch course data" },
			{ status: 500 }
		);
	}
}

// You can also handle other HTTP methods, e.g., POST, PUT, DELETE, etc., in the same file
