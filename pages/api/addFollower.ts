import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const 	follows = await sqlExecuter.any(
			 `INSERT INTO follows (follower_user_id,user_id) VALUES($1, $2)`, [data.follower_user_id, data.user_id]
			 );
			
	res.status(200).json(
		follows
	);
    };
