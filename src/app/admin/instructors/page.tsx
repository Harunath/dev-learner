import { user } from "@/lib/types";
import axios from "axios";

export default async function Instructors() {
	const response = await axios.get("http://localhost:3000/api/instructors");
	const instructors: user[] = response.data.data;
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
