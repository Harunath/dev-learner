import { atom } from "recoil";

export const userProfile = atom({
	key: "userProfile", // unique ID for the atom
	default: {
		id: 0,
		name: "",
		email: "",
		phone: "",
		role: "",
	},
});
