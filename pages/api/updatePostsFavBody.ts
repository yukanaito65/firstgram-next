
import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
    const data = req.body;
  
      const posts = await sqlExecuter.any(
                `UPDATE posts SET favorites = $1 WHERE post_id = $2`,[[data.favorites], data.post_id]
          );
      res.status(200).json(posts);
  };
