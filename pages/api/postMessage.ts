import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.body;

	const postMessage = await sqlExecuter.any(
              `INSERT INTO message(message,timestamp, user_id,with_user_id) VALUES($1, timezone('JST',$2), $3, $4)`, [data.message, 'now', data.user_id, data.with_user_id]
        );
	res.status(200).json(postMessage);
};
