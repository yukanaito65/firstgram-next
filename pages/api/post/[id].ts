import { sqlExecuter } from "../../../modules/database"

 export default async (req: any, res: any) => {

	const posts = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `SELECT * FROM posts where postId = ${id}`
        );
	res.status(200).json(
		posts
	);
};
// export default apiRoutes;
