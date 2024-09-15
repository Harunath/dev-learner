export interface courses {
	id: number;
	title: string;
	description: string;
	price: number;
	category: courseCategory[];
	isFeatured: boolean;
	instructorName: string | null;
	instructorId: number;
	createdAt: Date;
	updatedAt: Date;
}

enum courseCategory {
	WebDevelopment,
	Backend,
	Frontend,
	AI,
	DataScience,
}

export interface user {
	id: number;
	name: string;
	email: string;
	phone: string;
	role: string;
	courses: courses[];
}
