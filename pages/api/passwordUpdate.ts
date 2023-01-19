import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.body;

	const passwordUpdate = await sqlExecuter.any(
              `UPDATE users SET password = $2, cpassword = $3 WHERE user_id = $1`,[data.user_id, data.password, data.cpassword]
        );
	res.status(200).json(passwordUpdate);
};
