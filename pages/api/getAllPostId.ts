import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const allData = await sqlExecuter.any(
            `SELECT * FROM users JOIN posts ON users.user_id = posts.user_id JOIN comments ON posts.post_id = comments.post_id WHERE posts.post_id = $1`,[data.post_id]
        );
	res.status(200).json(
		allData
	);
};
