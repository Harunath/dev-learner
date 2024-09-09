"use client";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { userProfile } from "@/store/atoms";

import { useState } from "react";
import { useRecoilValue } from "recoil";

const NavBar = () => {
	const profile = useRecoilValue(userProfile);

	const { data: session } = useSession();
	const [isOpen, setIsOpen] = useState(false);

	return (
		<nav className="bg-blue-600 p-4">
			<div className="container mx-auto flex justify-between items-center">
				<div className="text-white text-lg font-bold">Dev Learners</div>
				<div className="md:hidden">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="text-white focus:outline-none">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d={
									isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"
								}></path>
						</svg>
					</button>
				</div>
				<div
					className={`${
						isOpen ? "block" : "hidden"
					} md:flex md:items-center w-full md:w-auto`}>
					<ul className="md:flex md:space-x-4 text-white">
						<li>
							<Link
								href="/"
								className="block py-2 md:px-4 hover:bg-blue-700 rounded">
								Home
							</Link>
						</li>
						{profile.role === "ADMIN" && (
							<li>
								<Link
									href="/admin"
									className="block py-2 md:px-4 hover:bg-blue-700 rounded">
									Admin
								</Link>
							</li>
						)}
						<li>
							<Link
								href="/courses"
								className="block py-2 md:px-4 hover:bg-blue-700 rounded">
								Courses
							</Link>
						</li>
						<li>
							<Link
								href="/profile"
								className="block py-2 md:px-4 hover:bg-blue-700 rounded">
								Profile
							</Link>
						</li>
						{!session?.user ? (
							<li>
								<button
									onClick={() => signIn()}
									className="block py-2 md:px-4 hover:bg-blue-700 rounded">
									SignIn
								</button>
							</li>
						) : (
							<li>
								<button
									onClick={() => signOut()}
									className="block py-2 md:px-4 hover:bg-blue-700 rounded">
									SignOut
								</button>
							</li>
						)}
					</ul>
				</div>
			</div>
		</nav>
	);
};

export default NavBar;
