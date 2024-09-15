import { user } from "@/lib/types";

export default async function Instructors() {
	const response = await fetch(
		`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/instructors`
	);
	const data = await response.json();
	const instructors: user[] = data;
	console.log(instructors);

	return (
		<div>
			<h1>Instructors</h1>
			<ul>
				{instructors.map((instructor) => (
					<li key={instructor.id}>{instructor.name}</li>
				))}
			</ul>
		</div>
	);
}
