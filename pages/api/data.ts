import { sqlExecuter } from "../../modules/database";

// const apiRoutes = async (req: any, res: any) => {
 export default async (req: any, res: any) => {

	const messages = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              "SELECT * FROM message"
        );
	res.status(200).json(
		messages
	);
};
// export default apiRoutes;
