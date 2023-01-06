import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {

	const users = await sqlExecuter.any(
		"SELECT * FROM users"
	);
	res.status(200).json(
		users
	);
};
