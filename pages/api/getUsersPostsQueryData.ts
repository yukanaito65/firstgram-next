import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const UsersPostsData = await sqlExecuter.any(
            `SELECT posts.post_id, posts.user_id, posts.caption, TO_CHAR(posts.timestamp, 'YYYY/MM/DD/ HH24:MI'), posts.post_img, users.user_id, users.user_name, users.name, users.email, users.profile, users.password, users.cpassword, users.icon_img FROM posts JOIN users ON posts.user_id = users.user_id WHERE users.user_id = $1`,[data.user_id]
        );
	res.status(200).json(
		UsersPostsData
	);
};
