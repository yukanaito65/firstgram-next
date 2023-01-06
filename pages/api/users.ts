import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {

	const users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              "SELECT * FROM users"
        );	
	
	res.status(200).json(
		users
	);
};
