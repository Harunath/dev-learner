export interface courses {
	id: number;
	title: string;
	description: string;
	price: number;
	instructorName?: string;
	instructorId: number;
}

export interface user {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	courses: courses[];
}
