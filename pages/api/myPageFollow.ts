import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.query;
	const userData = await sqlExecuter.any(
              // `SELECT follow_user_id, user_id FROM follows WHERE user_id = $1`, [data.user_id]
                `SELECT * FROM follows FULL OUTER JOIN users ON follows.follow_user_id = users.user_id WHERE follows.user_id = $1`,[data.user_id]
        );
	res.status(200).json(userData);
};
