import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const postsUsers = await sqlExecuter.any(
            `SELECT * FROM posts INNER JOIN users ON posts.user_id = users.user_id WHERE user_id = $1`, [data.user_id]
        );
	res.status(200).json(
		postsUsers
	);
};
