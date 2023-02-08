import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const currentUserKeeps = await sqlExecuter.any(
              `SELECT * FROM keeps WHERE post_id = $1 AND user_id = $2`, [data.post_id, data.user_id]
        );
	res.status(200).json(
		currentUserKeeps
	);
};
