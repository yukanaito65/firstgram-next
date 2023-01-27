import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const favsData = await sqlExecuter.any(
            `DELETE FROM follows WHERE follower_user_id = $1 AND user_id = $2`,[data.follower_user_id, data.user_id]
        );
	res.status(200).json(
		favsData
	);
};
