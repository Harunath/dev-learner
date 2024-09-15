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
	const [instructorName, setInstructorName] = useState("");
	const [instructors, setInstructors] = useState([]);
	const Categories = [
		"WebDevelopment",
		"Backend",
		"Frontend",
		"AI",
		"DataScience",
	];

	// State to store selected categories
	const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

	// Function to handle checkbox changes
	const handleCheckboxChange = (category: string) => {
		if (selectedCategories.includes(category)) {
			setSelectedCategories(
				selectedCategories.filter((selected) => selected !== category)
			);
		} else {
			setSelectedCategories([...selectedCategories, category]);
		}
	};

	// Fetch instructors on component mount
	useEffect(() => {
		const fetchInstructors = async () => {
			const response = await axios.get("/api/instructors");
			const data = await response.data.data;
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

		await axios.put(`/api/admin/courses/${id}`, {
			title,
			description,
			price: parseFloat(price as string),
			instructorId: parseInt(instructorId as string),
			category: selectedCategories,
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
					<div>
						<label className="block mb-2 font-medium text-gray-700">
							Categories:
						</label>
						{Categories.map((category) => (
							<div key={category} className="mb-2">
								<label className="inline-flex items-center">
									<input
										type="checkbox"
										value={category}
										checked={selectedCategories.includes(category)}
										onChange={() => handleCheckboxChange(category)}
										className="form-checkbox h-5 w-5 text-blue-600"
									/>
									<span className="ml-2 text-gray-700">{category}</span>
								</label>
							</div>
						))}
					</div>
					<div className="mb-4">
						<label className="block text-gray-700">Instructor:</label>
						<select
							value={instructorId}
							onChange={(e) => {
								const [id, name] = e.target.value.split(",");
								setInstructorId(id);
								setInstructorName(name);
							}}
							className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
							required>
							<option value="">Select Instructor</option>
							{instructors.map(
								(instructor: { id: string | number; name: string }) => (
									<option
										key={instructor.id}
										value={`${instructor.id},${instructor.name}`}>
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
