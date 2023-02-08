import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const allData = await sqlExecuter.any(
            `SELECT users.user_name as users_name, posts.timestamp as post_timestamp ,* FROM users FULL OUTER JOIN posts ON users.user_id = posts.user_id FULL OUTER JOIN comments ON posts.post_id = comments.post_id WHERE posts.post_id = $1`,[data.post_id]
        );
	res.status(200).json(
		allData
	);
};
// export default apiRoutes;
