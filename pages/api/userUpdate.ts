import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.body;

	const userUpdate = await sqlExecuter.any(
              `UPDATE users SET name = $2, user_name = $3, profile = $4 WHERE user_id = $1`,[data.user_id, data.name, data.user_name, data.profile]
        );
	res.status(200).json(userUpdate);
};
