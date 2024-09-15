import Link from "next/link";

interface Course {
	id: number;
	title: string;
	description: string;
	price: number;
	createdAt: string;
	updatedAt: string;
}

export default async function Courses() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/admin/courses`,
		{
			method: "GET",
		}
	);
	const courses: Course[] = await response.json();

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
