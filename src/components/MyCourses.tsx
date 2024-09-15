"use client";
// components/CourseList.tsx
import { useState, useEffect } from "react";
import { courses } from "@/lib/types";
import Link from "next/link";

const CourseList = () => {
	const [courses, setCourses] = useState<courses[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch("/api/user/courses");
				const data = await response.json();
				setCourses(data);
				setLoading(false);
			} catch (err) {
				setError("Failed to fetch courses");
				setLoading(false);
			}
		};

		fetchCourses();
	}, []);
	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
			{courses.length > 1 ? (
				courses.map((course) => (
					<div key={course.id} className="border rounded-lg p-4 shadow-md">
						<div className="flex justify-center items-center h-40 w-full bg-gray-200 rounded-xl">
							img
						</div>
						<div className="mt-4">
							<p className="text-xl font-bold">{course.title}</p>
							{course.instructorName && <p>by : {course.instructorName}</p>}
						</div>
						<div className=" mt-4 w-full h-fit">
							<Link
								href={`/my-courses/${course.id}`}
								className="flex items-center justify-center bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 w-full rounded">
								View Content
							</Link>
						</div>
					</div>
				))
			) : (
				<div>Your are not enrolled in any course</div>
			)}
		</div>
	);
};

export default CourseList;
