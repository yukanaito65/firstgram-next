
import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {
    const data = req.body;
  
      const posts = await sqlExecuter.any(
                `UPDATE posts SET keeps = $1 WHERE post_id = $2`,[[data.keeps], data.post_id]
          );
      res.status(200).json(posts);
  };
