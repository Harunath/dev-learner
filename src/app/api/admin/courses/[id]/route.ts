import { PrismaClient } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

const client = new PrismaClient();

export async function GET(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		const course = await client.course.findUnique({
			where: { id: Number(params.id) },
		});

		if (!course) {
			return NextResponse.json(
				{ message: "Course not found" },
				{ status: 404 }
			);
		}

		return NextResponse.json({ data: course }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json({ message: error }, { status: 500 });
	}
}

export async function PUT(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// Parse the request body
		const body = await req.json();
		const { title, description, price, instructorId, category } = body;
		console.log(category);

		// Update the course
		const updatedCourse = await client.course.update({
			where: { id: Number(params.id) },
			data: {
				title,
				description,
				price,
				instructorId,
				category,
			},
		});
		// Return a successful response
		return NextResponse.json({ updatedCourse }, { status: 200 });
	} catch (error) {
		console.error(error);
		// Return an error response
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: { id: string } }
) {
	try {
		// Update the course
		const deleteCourse = await client.course.delete({
			where: { id: Number(params.id) },
		});
		// Return a successful response
		return NextResponse.json({ deleteCourse }, { status: 200 });
	} catch (error) {
		console.error(error);
		// Return an error response
		return NextResponse.json(
			{ message: "Something went wrong" },
			{ status: 500 }
		);
	}
}
