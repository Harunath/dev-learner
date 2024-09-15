"use client";
// app/register/page.tsx or pages/register.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

const RegisterPage: React.FC = () => {
	const searchParams = useSearchParams();
	const initialEmail = searchParams.get("email") || "";
	const initialName = searchParams.get("name") || "";
	const [name, setName] = useState(initialName);
	const [email, setEmail] = useState(initialEmail);
	const [phone, setPhone] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState<string | null>(null);
	const router = useRouter();
	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			const res = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/register`,
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						name,
						email,
						phone,
						password,
					}),
				}
			);

			if (res.ok) {
				// Redirect or show success message
				router.push("/api/auth/signin"); // Redirect to login page or other page after successful registration
			} else {
				const data = await res.json();
				setError(data.message || "Something went wrong");
			}
		} catch (err) {
			setError("Failed to register");
		}
	};

	return (
		<div className="max-w-md mx-auto mt-10">
			<h1 className="text-2xl font-bold mb-4">Register</h1>
			{error && <p className="text-red-500">{error}</p>}
			<form onSubmit={handleSubmit}>
				<div className="mb-4">
					<label
						htmlFor="name"
						className="block text-sm font-medium text-gray-700">
						Name
					</label>
					<input
						id="name"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
						required
						className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="email"
						className="block text-sm font-medium text-gray-700">
						Email
					</label>
					<input
						id="email"
						type="email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						required
						className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="phone"
						className="block text-sm font-medium text-gray-700">
						Phone
					</label>
					<input
						id="phone"
						type="tel"
						value={phone}
						onChange={(e) => setPhone(e.target.value)}
						required
						className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					/>
				</div>

				<div className="mb-4">
					<label
						htmlFor="password"
						className="block text-sm font-medium text-gray-700">
						Password
					</label>
					<input
						id="password"
						type="password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						required
						className="mt-1 p-2 block w-full border border-gray-300 rounded-md"
					/>
				</div>

				<button
					type="submit"
					className="w-full bg-blue-500 text-white p-2 rounded-md">
					Register
				</button>
			</form>
		</div>
	);
};

export default RegisterPage;
