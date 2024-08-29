"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function EditCourse() {
	const router = useRouter();
	const { id } = router.query;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | string>("");
	const [instructorId, setInstructorId] = useState<number | string>("");

	useEffect(() => {
		if (id) {
			fetch(`/api/admin/courses/${id}`)
				.then((res) => res.json())
				.then((data) => {
					setTitle(data.title);
					setDescription(data.description);
					setPrice(data.price);
					setInstructorId(data.instructorId);
				});
		}
	}, [id]);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await fetch(`/api/admin/courses/${id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				title,
				description,
				price: parseFloat(price as string),
				instructorId: parseInt(instructorId as string),
			}),
		});

		router.push("/admin/courses");
	};

	return (
		<div>
			<h1>Edit Course</h1>
			<form onSubmit={handleSubmit}>
				<div>
					<label>Title:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Price:</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						required
					/>
				</div>
				<div>
					<label>Instructor ID:</label>
					<input
						type="number"
						value={instructorId}
						onChange={(e) => setInstructorId(e.target.value)}
						required
					/>
				</div>
				<button type="submit">Update Course</button>
			</form>
		</div>
	);
}
