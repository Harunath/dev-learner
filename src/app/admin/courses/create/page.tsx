"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateCourse() {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | string>("");
	const [instructorId, setInstructorId] = useState<number | string>("");
	const [instructors, setInstructors] = useState([]);
	const router = useRouter();

	// Fetch instructors on component mount
	useEffect(() => {
		const fetchInstructors = async () => {
			const response = await fetch("/api/instructors");
			const data = await response.json();
			setInstructors(data);
		};

		fetchInstructors();
	}, []);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		await fetch("/api/admin/courses/create", {
			method: "POST",
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
		<div className="max-w-md mx-auto mt-10 p-8 bg-white shadow-md rounded-lg">
			<h1 className="text-2xl font-bold mb-6">Create New Course</h1>
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label className="block text-gray-700">Title:</label>
					<input
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Description:</label>
					<textarea
						value={description}
						onChange={(e) => setDescription(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Price:</label>
					<input
						type="number"
						value={price}
						onChange={(e) => setPrice(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required
					/>
				</div>
				<div className="mb-4">
					<label className="block text-gray-700">Instructor:</label>
					<select
						value={instructorId}
						onChange={(e) => setInstructorId(e.target.value)}
						className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
						required>
						<option value="">Select Instructor</option>
						{instructors.map(
							(instructor: { id: string | number; name: string }) => (
								<option key={instructor.id} value={instructor.id}>
									{instructor.name}
								</option>
							)
						)}
					</select>
				</div>
				<button
					type="submit"
					className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-200">
					Create Course
				</button>
			</form>
		</div>
	);
}
