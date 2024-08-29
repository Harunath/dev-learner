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
				phone: {
					label: "Phone number",
					type: "text",
					placeholder: "1231231231",
					required: true,
				},
				password: { label: "Password", type: "password", required: true },
			},
			async authorize(credentials) {
				if (!credentials?.phone || !credentials.password) {
					return null;
				}

				const existingUser = await client.user.findFirst({
					where: {
						phone: credentials.phone,
					},
				});

				if (existingUser) {
					const passwordValidation = await bcrypt.compare(
						credentials.password,
						existingUser.password
					);
					if (passwordValidation) {
						return {
							id: existingUser.id.toString(),
							name: existingUser.name,
							email: existingUser.email,
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
			}
			return session;
		},
	},
};
