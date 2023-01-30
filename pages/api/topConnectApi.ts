import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const allData = await sqlExecuter.any(
            `SELECT * FROM posts FULL OUTER JOIN users ON posts.user_id = users.user_id FULL OUTER JOIN follows ON posts.user_id = follows.user_id WHERE users.user_id = $1`,[data.user_id]
            // posts.user_id, posts.caption, TO_CHAR(posts.timestamp, 'YYYY/MM/DD/ HH24:MI'), posts.post_img, users.user_id, users.user_name, users.name, users.email, users.profile, users.password, users.cpassword, users.icon_img, follows.follow_id, follows.follow_user_id, follows.follower_user_id, follows.user_id
        );
	res.status(200).json(
		allData
	);
};
