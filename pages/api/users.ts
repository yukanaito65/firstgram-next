import { useEffect, useState } from "react";
import { sqlExecuter } from "../../modules/database"
import { getAuth, onAuthStateChanged } from "firebase/auth";
import {auth} from "../../firebase";
import { User } from "../../types/types";
import { QueryParam } from "pg-promise";


export default async (req: any, res: any) => {

	// const [user, setUser] = useState<any>([]);
  // const [loading, setLoading] = useState(true);



  // useEffect(() => {
    onAuthStateChanged(auth, async(currentUser: any) => {
      if (!currentUser) {
      console.log("ログアウト状態")
      } else {
        // setUser(currentUser);
        // setLoading(false);
				console.log(currentUser.uid)
			}
		})
  // })

	const users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              "SELECT * FROM users"
							// `SELECT * FROM users WHERE userid='mJr5Sh743bavx0WkLhFALfjJ0Av1'`
        );


	res.status(200).json(users);

};
