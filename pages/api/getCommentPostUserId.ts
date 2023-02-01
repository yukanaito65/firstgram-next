import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const postsUsers = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
            //   `SELECT * FROM posts WHERE user_id = $1 ORDER BY timestamp DESC limit 1`, [data.user_id]
            `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE user_id = $1`, [data.user_id]
        );
	res.status(200).json(
		postsUsers
	);
};
// export default apiRoutes;
