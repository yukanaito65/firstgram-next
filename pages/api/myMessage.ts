import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
      const data = req.query;

	const myMessage = await sqlExecuter.any(
              `SELECT message.message, TO_CHAR(message.timestamp, 'YYYY年MM月DD日 HH24:MI'), message.user_id, message.with_user_id, users.name FROM message LEFT OUTER JOIN users ON message.user_id = users.user_id WHERE (message.user_id,message.with_user_id) in (($1,$2), ($2,$1)) ORDER BY message.timestamp`, [data.user_id, data.with_user_id]
        );
	res.status(200).json(myMessage);
};
