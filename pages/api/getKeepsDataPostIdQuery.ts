import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const favorites = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `SELECT * FROM keeps WHERE post_id = $1`, [data.post_id]
        );
	res.status(200).json(
		favorites
	);
};
// export default apiRoutes;
