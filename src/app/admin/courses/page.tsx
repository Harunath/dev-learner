import Link from "next/link";
import axios from "axios";

interface Course {
	id: number;
	title: string;
	description: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export default async function Courses() {
	const response = await axios.get("http://localhost:3000/api/admin/courses");
	const courses: Course[] = response.data;

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
