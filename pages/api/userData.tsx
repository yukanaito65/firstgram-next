import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.query;
	const userData = await sqlExecuter.any(
              `SELECT * FROM users WHERE user_id = $1`, [data.user_id]
        );
	res.status(200).json(userData);

};
