export default async (req: any, res: any) => {
    const data = req.body;
  
      const passwordUpdate = await sqlExecuter.any(
                `UPDATE users SET post_id = $1 WHERE user_id = $2`,[data.post_id, data.user_id]
          );
      res.status(200).json(passwordUpdate);
  };
