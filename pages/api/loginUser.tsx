import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.body;
	const loginUsers = await sqlExecuter.any(
              // `SELECT * FROM users WHERE user_id = 'mJr5Sh743bavx0WkLhFALfjJ0Av1'`
              `SELECT * FROM users WHERE user_id = 'jIUhM07fe0aiuP1uPdLBTy8lKz52'`
        );
	res.status(200).json(loginUsers);

};
