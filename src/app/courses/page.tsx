import CourseList from "@/components/CourseList";
import React from "react";

const Courses = async () => {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/courses`,
		{
			method: "GET",
		}
	);
	const courses = await response.json();
	console.log(courses);
	return (
		<div>
			<CourseList />
		</div>
	);
};

export default Courses;
