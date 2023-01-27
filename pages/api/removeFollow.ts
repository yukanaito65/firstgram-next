// import { sqlExecuter } from "../../modules/database"

//  export default async (req: any, res: any) => {
// 	const data = req.body;

// 	const 	users = await sqlExecuter.any(
//               //  "select 'DB参照したデータ' as any_column"
//             `DELETE FROM users SET follow = $1 WHERE user_id = $2`,[[data.follow], data.user_id]
//             // `UPDATE posts users SET follow = $1 WHERE user_id = $2`,[[data.follow], data.user_id]
//             );
			
// 	res.status(200).json(
// 		users
// 	);

// };

import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const favsData = await sqlExecuter.any(
            `DELETE FROM follows WHERE follow_user_id = $1 AND user_id = $2`,[data.follow_user_id, data.user_id]
        );
	res.status(200).json(
		favsData
	);
};
