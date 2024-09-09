import Link from "next/link";

const AdminHome = () => {
	return (
		<div>
			<Link href={"/admin/courses"}>Courses</Link>
			<Link href={"/admin/register"}>Register</Link>
		</div>
	);
};

export default AdminHome;
