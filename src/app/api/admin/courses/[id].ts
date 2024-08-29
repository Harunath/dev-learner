import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function handler(
	req: NextApiRequest,
	res: NextApiResponse
) {
	const { id } = req.query;

	if (req.method === "GET") {
		try {
			const course = await prisma.course.findUnique({
				where: { id: Number(id) },
			});

			if (!course) {
				return res.status(404).json({ message: "Course not found" });
			}

			res.status(200).json(course);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Something went wrong" });
		}
	} else if (req.method === "PUT") {
		const { title, description, price, instructorId } = req.body;

		try {
			const updatedCourse = await prisma.course.update({
				where: { id: Number(id) },
				data: {
					title,
					description,
					price,
					instructorId,
				},
			});

			res.status(200).json(updatedCourse);
		} catch (error) {
			console.error(error);
			res.status(500).json({ message: "Something went wrong" });
		}
	} else {
		res.status(405).json({ message: "Method not allowed" });
	}
}
