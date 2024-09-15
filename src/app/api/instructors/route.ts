import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function GET(req: NextRequest) {
	try {
		const instructors = await prisma.user.findMany({
			where: { role: "INSTRUCTOR" },
		});
		return NextResponse.json({ data: instructors }, { status: 200 });
	} catch (e) {
		console.log(e);
		return NextResponse.json({ Error: e }, { status: 500 });
	}
}

interface InstructorBody {
	name: string;
	email: string;
	phone: string;
	password: string;
}

export async function POST(req: NextRequest) {
	try {
		const body: InstructorBody = await req.json();
		const { name, email, phone, password } = body;

		// Check if user already exists
		const existingUser = await prisma.user.findUnique({
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
		const newAdmin = await prisma.user.create({
			data: {
				name,
				email,
				password: hashedPassword,
				phone,
				role: "INSTRUCTOR", // Assuming you have a role field
			},
		});

		return NextResponse.json(newAdmin, { status: 201 });
	} catch (error) {
		console.error("Error creating admin:", error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		await prisma.$disconnect();
	}
}
