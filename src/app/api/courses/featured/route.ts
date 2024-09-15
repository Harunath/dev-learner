import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		// Parse query parameters from the request URL
		const { searchParams } = new URL(req.url);
		const category = searchParams.get("category");
		const title = searchParams.get("title");
		const instructorId = searchParams.get("instructorId");

		// Build the filter object based on the provided query parameters
		const filters: any = {};

		if (category) {
			filters.category = category;
		}

		if (title) {
			// Use case-insensitive search for title
			filters.title = {
				contains: title,
				mode: "insensitive",
			};
		}

		if (instructorId) {
			filters.instructorId = instructorId;
		}

		// Apply filters in the Prisma query
		const courses = await client.course.findMany({
			where: filters,
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
