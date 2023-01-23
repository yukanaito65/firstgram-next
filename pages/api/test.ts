// import { sqlExecuter } from "../../modules/database"

//  export default async (req: any, res: any) => {
// 	const data = req.body;

// 	const test = await sqlExecuter.any(
//               //  "select 'DB参照したデータ' as any_column"
//             //   `INSERT INTO test VALUES($1)`, [data.testid]
// 			`SELECT * FROM users `  
//         );
// 	res.status(200).json(
// 		test
// 	);
// };

import { sqlExecuter } from "../../modules/database"


export default async (req: any, res: any) => {

const data =  req.query;
	const users = await sqlExecuter.any(
            `SELECT * FROM users WHERE user_id = $1`,[data.user_id]
        );
	res.status(200).json(users);

};
