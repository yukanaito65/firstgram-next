import { sqlExecuter } from "../../modules/database"

export default async (req: any, res: any) => {

	const users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              // "SELECT * FROM users"
							// `SELECT * FROM users WHERE userid='mJr5Sh743bavx0WkLhFALfjJ0Av1'`
              // "UPDATE users SET userid = users.userid, name = name, username = username, profile = profile WHERE userid = 'mJr5Sh743bavx0WkLhFALfjJ0Av1'"
              "UPDATE public.users SET userid = 'mJr5Sh743bavx0WkLhFALfjJ0Av1', name = name, username = username, profile = profile WHERE userid = 'mJr5Sh743bavx0WkLhFALfjJ0Av1'"
        );
	res.status(200).json(users);
};
