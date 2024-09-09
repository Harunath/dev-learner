"use client";

import { useEffect } from "react";
import MyCourses from "@/components/MyCourses";
import { useRecoilValue } from "recoil";
import { userProfile } from "@/store/atoms";

export default function Profile() {
	const user = useRecoilValue(userProfile);

	return (
		<div>
			{user && (
				<div>
					<p>Name : {user.name}</p>
					<p>Email : {user.email}</p>
					<p>Phone : {user.phone}</p>
					<p>Role : {user.role}</p>
				</div>
			)}
			<MyCourses />
		</div>
	);
}
