import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const favorites = await sqlExecuter.any(
        `INSERT INTO favorites (post_id, user_id, user_name) VALUES($1, $2, $3)`, [data.post_id, data.user_id, data.user_name]
        );
	res.status(200).json(
		favorites
	);
};
// export default apiRoutes;
