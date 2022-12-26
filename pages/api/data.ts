import { sqlExecuter } from "../../modules/database";

// const apiRoutes = async (req: any, res: any) => {
 export default async (req: any, res: any) => {

	const data = await sqlExecuter.any(
               "select 'DB参照したデータ' as any_column"
              // "SELECT * FROM message as any_column"
        );
	res.status(200).json({
		data
	});
};
// export default apiRoutes;
