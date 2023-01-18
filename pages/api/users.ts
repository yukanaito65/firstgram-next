import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {
	const data = req.body;

	const 	users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
              `INSERT INTO users VALUES($1, $2, $3, $4)`, [data.userId, data.userName, data.name, data.email,data.password,data.Cpassword,data.follow,data.follower,data.favoritePosts,data.profile,data.posts,data.keepPosts]
 			// "INSERT INTO users [(column[userId,userName,name,email,password,Cpassword,follow,follower,favoritePosts,profile,posts,keepPosts])] {DEFAULY VALUES | VALUES ('userId','userName','name','email','password','Cpassword','follow','follower','favoritePosts','profile','posts','keepPosts')}"
			  );
	res.status(200).json(
		users
	);
};
