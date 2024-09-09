"use client";
// components/CourseList.tsx
import { useState, useEffect } from "react";
import axios from "axios";
import { courses } from "@/lib/types";

const CourseList = () => {
	const [courses, setCourses] = useState<courses[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState("");

	useEffect(() => {
		const fetchCourses = async () => {
			try {
				const response = await axios.get("/api/user/courses");
				setCourses(response.data);
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
						<h2 className="text-xl font-bold">{course.title}</h2>
						<p>{course.description}</p>
						{course.instructorName && <p>by : {course.instructorName}</p>}
					</div>
				))
			) : (
				<div>Your are not enrolled in any course</div>
			)}
		</div>
	);
};

export default CourseList;
