import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const posts = await sqlExecuter.any(
            `SELECT * FROM posts WHERE post_id = $1`, [data.post_id]
        );
	res.status(200).json(
		posts
	);
};
