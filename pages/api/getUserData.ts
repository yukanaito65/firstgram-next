import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const userData = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `SELECT * FROM users WHERE user_id = $1`, [data.user_id]
        );
	res.status(200).json(
		userData
	);
};
// export default apiRoutes;
