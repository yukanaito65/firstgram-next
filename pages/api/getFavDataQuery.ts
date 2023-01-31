import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.query;

	const favorites = await sqlExecuter.any(
              `SELECT favorites.post_id FROM favorites`
        );
	res.status(200).json(
		favorites
	);
};
