import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

		const posts = await sqlExecuter.any(
				`SELECT  posts.post_id, posts.caption, TO_CHAR(posts.timestamp, 'YYYY/MM/DD/ HH24:MI'), posts.post_img, users.user_id, users.user_name, users.icon_img FROM posts LEFT JOIN users ON users.user_id = posts.user_id WHERE users.user_id = $1 ORDER BY posts.timestamp`, [data.user_id]
        );
	res.status(200).json(
		posts
	);
};
