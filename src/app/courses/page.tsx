import CourseList from "@/components/CourseList";
import React from "react";

const Courses = async () => {
	const response = await fetch("http://localhost:3000/api/courses", {
		method: "GET",
	});
	const courses = await response.json();
	console.log(courses);
	return (
		<div>
			<CourseList />
		</div>
	);
};

export default Courses;
