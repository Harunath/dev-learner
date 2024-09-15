// app/page.tsx
"use client";

import Link from "next/link";
import MyCourses from "./MyCourses";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Testimonials from "./Testimonials";
import { userProfile } from "@/store/atoms";
import { useRecoilState } from "recoil";

const HomePage = () => {
	const router = useRouter();
	const [user, setUser] = useRecoilState(userProfile);

	useEffect(() => {
		const getUser = async () => {
			const response = await fetch(
				`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user`
			);
			const data = await response.json();
			setUser(data);
		};
		getUser();
		if (!user) {
			signIn(); // Redirect to sign in if no user is found
		} else {
			router.push("/"); // Redirect to home or another page if logged in
		}
	}, []);

	// Example data (replace with real data from your API)
	const popularCourses = [
		{ id: 1, title: "React for Beginners", instructor: "John Doe" },
		{ id: 2, title: "Advanced Node.js", instructor: "Jane Smith" },
		{ id: 3, title: "Understanding TypeScript", instructor: "Emily Johnson" },
	];

	const featuredCourses = [
		{ id: 4, title: "Full Stack Development", instructor: "Michael Brown" },
		{ id: 5, title: "Machine Learning Basics", instructor: "Sarah Davis" },
	];

	const popularTutors = [
		{
			id: 1,
			name: "John Doe",
			bio: "Expert in React and Frontend Development",
		},
		{
			id: 2,
			name: "Jane Smith",
			bio: "Full Stack Developer with a focus on Node.js",
		},
	];

	return (
		<div className="container mx-auto px-4 py-8">
			<h1 className="text-3xl font-bold mb-6">Welcome to CourseHub</h1>
			<section className="mb-12">
				<Link href={"/my-courses"} className="text-2xl font-semibold mb-4">
					My Courses
				</Link>
				<MyCourses />
			</section>
			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Popular Courses</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{popularCourses.map((course) => (
						<div key={course.id} className="border rounded-lg p-4 shadow-lg">
							<h3 className="text-xl font-semibold">{course.title}</h3>
							<p className="text-gray-600">Instructor: {course.instructor}</p>
							<Link
								href={`/courses/${course.id}`}
								className="text-blue-500 mt-2 block">
								View Course
							</Link>
						</div>
					))}
				</div>
			</section>

			<section className="mb-12">
				<h2 className="text-2xl font-semibold mb-4">Featured Courses</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{featuredCourses.map((course) => (
						<div key={course.id} className="border rounded-lg p-4 shadow-lg">
							<h3 className="text-xl font-semibold">{course.title}</h3>
							<p className="text-gray-600">Instructor: {course.instructor}</p>
							<Link
								href={`/courses/${course.id}`}
								className="text-blue-500 mt-2 block">
								View Course
							</Link>
						</div>
					))}
				</div>
			</section>

			<section>
				<h2 className="text-2xl font-semibold mb-4">Popular Tutors</h2>
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
					{popularTutors.map((tutor) => (
						<div key={tutor.id} className="border rounded-lg p-4 shadow-lg">
							<h3 className="text-xl font-semibold">{tutor.name}</h3>
							<p className="text-gray-600">{tutor.bio}</p>
							<Link
								href={`/tutors/${tutor.id}`}
								className="text-blue-500 mt-2 block">
								View Profile
							</Link>
						</div>
					))}
				</div>
			</section>
			<Testimonials />
		</div>
	);
};

export default HomePage;
