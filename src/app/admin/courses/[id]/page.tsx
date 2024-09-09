"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import axios from "axios";

export default function EditCourse() {
	const router = useRouter();
	const params = useParams();
	const { id } = params;

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [price, setPrice] = useState<number | string>("");
	const [instructorId, setInstructorId] = useState<number | string>("");
	const [instructors, setInstructors] = useState([]);

	// Fetch instructors on component mount
	useEffect(() => {
		const fetchInstructors = async () => {
			const response = await fetch("/api/instructor", {
				method: "GET",
			});
			const data = await response.json();
			setInstructors(data);
		};

		fetchInstructors();
		if (id) {
			const getCourse = async () => {
				const response = await axios.get(`/api/admin/courses/${id}`);
				if (response.data) {
					setTitle(response.data.data.title);
					setDescription(response.data.data.description);
					setPrice(response.data.data.price);
					setInstructorId(response.data.data.instructorId);
				}
			};
			getCourse();
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
		<div className="flex justify-center items-center min-h-screen bg-gray-100">
			<div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
				<h1 className="text-2xl font-bold mb-6 text-center">Edit Course</h1>
				<form onSubmit={handleSubmit} className="space-y-4">
					<div>
						<label className="block mb-2 font-medium text-gray-700">
							Title:
						</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
						/>
					</div>
					<div>
						<label className="block mb-2 font-medium text-gray-700">
							Description:
						</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
							rows={4}
						/>
					</div>
					<div>
						<label className="block mb-2 font-medium text-gray-700">
							Price:
						</label>
						<input
							type="number"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
							className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
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
					<div className="flex justify-center">
						<button
							type="submit"
							className="bg-blue-500 text-white px-6 py-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400">
							Update Course
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}
