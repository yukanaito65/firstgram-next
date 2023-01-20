import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const comments = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `SELECT * FROM comments WHERE post_id = $1`, [data.post_id]
        );
	res.status(200).json(
		comments
	);
};
// export default apiRoutes;
