import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function POST(req: NextRequest) {
	try {
		const {
			title,
			description,
			price,
			instructorId,
		}: {
			title: string;
			description: string;
			price: number;
			instructorId: number;
		} = await req.json();
		const newCourse = await client.course.create({
			data: {
				title,
				description,
				price,
				instructorId,
			},
		});
		return NextResponse.json(newCourse, { status: 201 });
	} catch (error) {
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect();
	}
}
