import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

		const posts = await sqlExecuter.any(
				//  "select 'DB参照したデータ' as any_column"
				//   `SELECT * FROM posts WHERE user_id = $1 ORDER BY timestamp DESC limit 1`, [data.user_id]
				`SELECT * FROM posts WHERE user_id = $1 IN`, [[data.follow]]
        );
	res.status(200).json(
		posts
	);
};
// export default apiRoutes;
