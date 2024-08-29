"use client";

import { useSession } from "next-auth/react";

export default function Profile() {
	const session = useSession();
	return <div>{JSON.stringify(session.data?.user)}</div>;
}
