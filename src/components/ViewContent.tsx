"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { courses } from "@/lib/types";

function ViewContent() {
	const params = useParams();
	const [course, setCourse] = useState<courses | null>(null);

	useEffect(() => {
		const getCourse = async (): Promise<void> => {
			try {
				const response = await axios.get(`/api/courses/${params.id}`);
				setCourse(response.data.course);
			} catch (error) {
				console.error("Error fetching course data:", error);
			}
		};

		getCourse();
	}, [params.id]); // Dependency array ensures this runs when `params.id` changes

	return (
		<div>
			<h1>View Content</h1>
			<p>Course ID: {params.id}</p>
			{course ? (
				<div>
					<h2>{course.title}</h2>
					<p>{course.description}</p>
					<p>Price: ${course.price}</p>
					<p>Instructor: {course.instructorName || "Unknown"}</p>
				</div>
			) : (
				<p>Loading course details...</p>
			)}
		</div>
	);
}

export default ViewContent;
