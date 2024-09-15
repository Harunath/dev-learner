"use client";
// components/CourseList.tsx
import { useState, useEffect } from "react";
import { courses } from "@/lib/types";

const CourseList = () => {
	const [courses, setCourses] = useState<courses[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await fetch("/api/courses");
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

	const handleBuyCourse = async (courseId: number) => {
		try {
			await fetch("/api/user/courses/buy", {
				method: "POST",
				headers: {
					"Content-Type": "application/json", // Set the Content-Type header
				},
				body: JSON.stringify({
					courseId, // Pass the courseId as part of the JSON body
				}),
			});
			alert("Course purchased successfully!");
		} catch (err) {
			alert("Failed to purchase course");
		}
	};

	if (loading) return <div>Loading...</div>;
	if (error) return <div>{error}</div>;

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
			{courses.length === 0 && <p>0 enrolled courses</p>}
			{courses.map((course) => (
				<div key={course.id} className="border rounded-lg p-4 shadow-md">
					<div className="flex justify-center items-center h-40 w-full bg-gray-200 rounded-xl">
						img
					</div>
					<h2 className="text-xl font-bold">{course.title}</h2>
					<p>{course.description}</p>
					{course.instructorName && <p>by : {course.instructorName}</p>}
					<p className="text-green-600 font-semibold">${course.price}</p>
					<div>
						{course.category &&
							course.category.map((category, index) => (
								<p className="bg-gray-400 rounded px-4 my-2 w-fit" key={index}>
									{category}
								</p>
							))}
					</div>
					<button
						onClick={() => handleBuyCourse(course.id)}
						className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-600">
						Buy Course
					</button>
				</div>
			))}
		</div>
	);
};

export default CourseList;
