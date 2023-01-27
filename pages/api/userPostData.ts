import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.query;
	const userData = await sqlExecuter.any(
              // `SELECT * FROM posts WHERE user_id = $1`, [data.user_id]
              // `SELECT posts.user_id, posts.post_img, posts.post_id, posts.timestamp, users.user_id FROM posts INNER JOIN users ON posts.user_id = users.id;
              // `SELECT posts.posts, TO_CHAR(posts.timestamp, 'YYYY年MM月DD日 HH24:MI'), posts.user_id, posts.post_id, posts.post_img posts.timestamp, users.user_id FROM posts LEFT OUTER JOIN users ON posts.user_id = users.user_id WHERE (users.user_id) in ($1) ORDER BY posts.timestamp`, [data.user_id]
              `SELECT posts.posts, posts.user_id, posts.post_id, posts.post_img , users.user_id FROM posts LEFT OUTER JOIN users ON posts.user_id = users.user_id WHERE (users.user_id) in ($1) `, [data.user_id]
              );
	res.status(200).json(userData);

};
