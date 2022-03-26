export const apiUrl =
	process.env.NODE_ENV === "production"
		? "http://alexandrshin-001-site1.btempurl.com/api/solve"
		: "https://localhost:7272/api/solve";
