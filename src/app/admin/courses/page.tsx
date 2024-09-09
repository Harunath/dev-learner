"use client";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Course {
	id: number;
	title: string;
	description: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export default function Courses() {
	const [courses, setCourses] = useState<Course[]>([]);

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch("/api/admin/courses");
				if (!response.ok) {
					throw new Error("Network response was not ok");
				}
				const data = await response.json();
				setCourses(data);
			} catch (error) {
				console.error("Error fetching courses:", error);
			}
		};

		fetchCourses();
	}, []);

	return (
		<div>
			<h1>All Courses</h1>
			<Link href="/admin/courses/create">
				<button>Create New Course</button>
			</Link>
			<ul>
				{courses.map((course) => (
					<li key={course.id}>
						<Link href={`/admin/courses/${course.id}`}>{course.title}</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
