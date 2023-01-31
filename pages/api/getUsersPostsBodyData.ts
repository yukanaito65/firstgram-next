import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const UsersPostsData = await sqlExecuter.any(
            `SELECT posts.post_id, posts.user_id, posts.caption, TO_CHAR(posts.timestamp, 'YYYY/MM/DD/ HH24:MI'), posts.post_img, users.user_id, users.user_name, users.icon_img FROM posts FULL OUTER JOIN users ON posts.user_id = users.user_id ORDER BY posts.timestamp WHERE users.user_id = $1`,[data.user_id]
        );
	res.status(200).json(
		UsersPostsData
	);
};
