// app/api/admin/instructor/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const client = new PrismaClient();

interface InstructorBody {
	name: string;
	email: string;
	phone: string;
	password: string;
}

// Handle POST requests to create a new instructor
export async function POST(req: NextRequest) {
	try {
		const body: InstructorBody = await req.json();
		const { name, email, phone, password } = body;

		// Check if user already exists
		const existingUser = await client.user.findUnique({
			where: { email },
		});

		if (existingUser) {
			return NextResponse.json(
				{ message: "User already exists" },
				{ status: 400 }
			);
		}

		// Hash the password before saving it to the database
		const hashedPassword = await bcrypt.hash(password, 10);

		// Create the new instructor
		const newInstructor = await client.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: "INSTRUCTOR",
			},
		});

		return NextResponse.json(newInstructor, { status: 201 });
	} catch (error) {
		console.error("Error creating instructor:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect();
	}
}

// Handle GET requests to fetch all instructors
export async function GET(req: NextRequest) {
	try {
		const instructors = await client.user.findMany({
			where: { role: "INSTRUCTOR" },
			select: { id: true, name: true },
		});
		return NextResponse.json(instructors, { status: 200 });
	} catch (error) {
		console.error("Error fetching instructors:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect();
	}
}
