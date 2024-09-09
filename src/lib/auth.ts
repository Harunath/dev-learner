import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import bcrypt from "bcrypt";
import { PrismaClient } from "@prisma/client";

const client = new PrismaClient();

export const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: {
					label: "username",
					type: "text",
					placeholder: "Username",
					required: true,
				},
				password: { label: "Password", type: "password", required: true },
			},
			async authorize(credentials) {
				if (!credentials?.email || !credentials?.password) {
					return null;
				}

				const existingUser = await client.user.findFirst({
					where: {
						email: credentials.email,
					},
					include: {
						courses: true, // Assuming you have courses as a relation
					},
				});

				// Check if the user exists
				if (!existingUser) {
					return null;
				}

				// Continue with further logic here

				if (existingUser) {
					const passwordValidation = await bcrypt.compare(
						credentials.password,
						existingUser.password
					);
					if (passwordValidation) {
						// Return user object with id as a string
						return {
							id: String(existingUser.id), // Make sure id is a string
							name: existingUser.name,
							email: existingUser.email,
							role: existingUser.role,
							phone: existingUser.phone,
						};
					}
				}

				return null;
			},
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID as string,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
		}),
	],
	secret: process.env.JWT_SECRET || "secret",
	callbacks: {
		async session({ token, session }: any) {
			if (token?.sub) {
				session.user.id = token.sub;
				session.user.role = token.role;
				session.user.image = session.user.image || "";
			}
			return session;
		},
		async signIn({ user, account, profile }: any) {
			const existingUser = await client.user.findFirst({
				where: {
					email: user.email,
				},
			});
			if (existingUser) {
				if (account.provider === "google") {
					user.id = existingUser.id;
				}
			}

			if (existingUser) {
				return true; // Allow sign-in and redirect to home
			} else {
				const url = `/register?email=${encodeURIComponent(
					user.email
				)}&name=${encodeURIComponent(user.name)}`;
				return url;
			}
		},
		async jwt({ token, user, account, profile, isNewUser }: any) {
			return token;
		},
	},
};
