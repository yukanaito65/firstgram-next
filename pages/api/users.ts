import { sqlExecuter } from "../../modules/database"


 export default async (req: any, res: any) => {
	const data = req.body;

	const 	users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `INSERT INTO users(userid,username,name,email,password,cpassword,profile) VALUES($1, $2, $3, $4,$5,$6,$7)`, [data.userid, data.username, data.name, data.email,data.password,data.cpassword,data.profile]
			 );
			
	res.status(200).json(
		users
	);

// export default async (req: any, res: any) => {
// 	const users = await sqlExecuter.any(
//               "SELECT * FROM users"
//         );
// 	res.status(200).json(users);

};
