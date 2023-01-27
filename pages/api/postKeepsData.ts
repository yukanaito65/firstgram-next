import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const keeps = await sqlExecuter.any(
        `INSERT INTO keeps (post_id, user_id) VALUES($1, $2)`, [data.post_id, data.user_id]
        );
	res.status(200).json(
		keeps
	);
};
