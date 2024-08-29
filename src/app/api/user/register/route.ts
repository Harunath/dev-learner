import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

// Import necessary modules
// const bcrypt = require('bcrypt');
import bcrypt from "bcrypt";

interface RegisterBody {
	name: string;
	email: string;
	phone: string;
	password: string;
}

// Register User Function
async function register(req: NextRequest) {
	const client = new PrismaClient();
	try {
		const body: RegisterBody = await req.json();
		const { name, email, password, phone } = body;
		console.log(name + " " + email);

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

		// Create the new user
		const newUser = await client.user.create({
			data: {
				name,
				email,
				phone, // Optional: You might want to restrict this field to prevent misuse
				password: hashedPassword,
			},
		});

		// Respond with the newly created user data (excluding the password)
		return NextResponse.json(
			{
				id: newUser.id,
				name: newUser.name,
				email: newUser.email,
				role: newUser.role,
				createdAt: newUser.createdAt,
			},
			{ status: 201 }
		);
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ message: "Internal server error" },
			{ status: 500 }
		);
	} finally {
		await client.$disconnect();
	}
}

export { register as POST };
