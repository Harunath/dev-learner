"use client";
import { useState } from "react";
import { useRouter } from "next/router";

const InstructorCreate = () => {
	const router = useRouter();
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		phone: "",
		password: "",
		role: "INSTRUCTOR", // Default role
	});

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
	) => {
		setFormData({
			...formData,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const response = await fetch("/api/instructor/", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(formData),
		});

		if (response.ok) {
			alert("User created successfully");
			router.push("/");
		} else {
			alert("Failed to create user");
		}
	};

	return (
		<form
			onSubmit={handleSubmit}
			className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
			<h2 className="text-2xl font-bold mb-4">Create User</h2>

			<div className="mb-4">
				<label htmlFor="name" className="block text-gray-700 font-bold mb-2">
					Name
				</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="email" className="block text-gray-700 font-bold mb-2">
					Email
				</label>
				<input
					type="email"
					name="email"
					value={formData.email}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="phone" className="block text-gray-700 font-bold mb-2">
					Phone
				</label>
				<input
					type="text"
					name="phone"
					value={formData.phone}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label
					htmlFor="password"
					className="block text-gray-700 font-bold mb-2">
					Password
				</label>
				<input
					type="password"
					name="password"
					value={formData.password}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					required
				/>
			</div>

			<div className="mb-4">
				<label htmlFor="role" className="block text-gray-700 font-bold mb-2">
					Role
				</label>
				<select
					name="role"
					value={formData.role}
					onChange={handleChange}
					className="w-full p-2 border border-gray-300 rounded"
					required>
					<option value="instructor">Instructor</option>
					<option value="admin">Admin</option>
				</select>
			</div>

			<button
				type="submit"
				className="w-full p-2 bg-blue-500 text-white font-bold rounded">
				Create User
			</button>
		</form>
	);
};

export default InstructorCreate;
