import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const totalData = await sqlExecuter.any(
			`SELECT users.user_id, users.user_name, users.icon_img, follows.follow_user_id, posts.post_id, posts.caption, TO_CHAR(posts.timestamp, 'YYYY/MM/DD/ HH24:MI'), posts.post_img FROM users LEFT JOIN follows ON users.user_id = follows.user_id LEFT JOIN posts ON posts.user_id = follows.follow_user_id WHERE follows.user_id = $1 ORDER BY posts.timestamp`,[data.user_id]
        );
	res.status(200).json(
		totalData
	);
};
