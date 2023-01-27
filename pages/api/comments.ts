import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {

	const comments = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              "SELECT * FROM comments"
        );
	res.status(200).json(
		comments
	);
};
// export default apiRoutes;
