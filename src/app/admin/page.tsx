import Link from "next/link";

const AdminHome = () => {
	return (
		<div>
			<div className="flex flex-col justify-center gap-2 w-60 p-4 bg-gray-200">
				<Link className=" p-2 bg-blue-300 rounded" href={"/admin/courses"}>
					Courses
				</Link>
				<Link className=" p-2 bg-blue-300 rounded" href={"/admin/register"}>
					Register
				</Link>
				<Link className=" p-2 bg-blue-300 rounded" href={"/admin/instructors"}>
					instructors
				</Link>
			</div>
		</div>
	);
};

export default AdminHome;
