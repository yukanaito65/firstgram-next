import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const 	users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
            //   `INSERT INTO users(userid,username,name,email,password,cpassword,profile) VALUES($1, $2, $3, $4,$5,$6,$7)`, [data.userid, data.username, data.name, data.email,data.password,data.cpassword,data.profile]
			//  `INSERT INTO users VALUES($1, $2, $3, $4, $5. $6. $7, $8, $8, $9, $10, $11, $12, $13)`, [data.userid, data.username, data.name, data.icon, data.email,data.password,data.cpassword, data.follow, data.follower, data.favorite_posts, data.profile, data.posts, data.keep_posts]
			 `INSERT INTO users VALUES($1, $2, $3, $4, $5. $6. $7, $8, $8, $9, $10, $11, $12)`, [data.user_id, data.user_name, data.name,data.email,data.password,data.cpassword, [data.follow], [data.follower], [data.favorite_posts], data.profile, [data.posts], [data.keep_posts]]
			 );
			
	res.status(200).json(
		users
	);
};
