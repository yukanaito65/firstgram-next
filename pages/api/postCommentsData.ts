import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const comment = await sqlExecuter.any(
        `INSERT INTO comments (comment, timestamp, post_id, user_name) VALUES($1, timezone('JST',$2), $3, $4)`, [data.comment, 'now', data.post_id, data.user_name]
        );
	res.status(200).json(
		comment
	);
};
// export default apiRoutes;
