import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
  const data = req.body;

    const removeIcon = await sqlExecuter.any(
      `UPDATE users SET icon_img = $2 WHERE user_id = $1`,[data.user_id, data.icon_img]
        );
    res.status(200).json(removeIcon);
};
