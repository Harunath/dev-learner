import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const courses = await client.course.findMany();
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
