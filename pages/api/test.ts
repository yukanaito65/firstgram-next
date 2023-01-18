import { useState } from "react";
import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const test = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `INSERT INTO test VALUES($1)`, [data.testid]
        );
	res.status(200).json(
		test
	);
};
