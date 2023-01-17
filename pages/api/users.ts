import { sqlExecuter } from "../../modules/database"

 export default async (req: any, res: any) => {

	const users = await sqlExecuter.any(
              //  "select 'DB参照したデータ' as any_column"
            //   "SELECT * FROM users"
			// "INSERT INTO users [(column[userId,userName,name,email,password,Cpassword,follow,follower,favoritePosts,profile,posts,keepPosts])] {DEFAULY VALUES | VALUES ('userId','userName','name','email','password','Cpassword','follow','follower','favoritePosts','profile','posts','keepPosts')}"
			"INSERT INTO users [userId,userName,name,email,password,Cpassword,follow,follower,favoritePosts,profile,posts,keepPosts] VALUES ('userId','userName','name','email','password','Cpassword','follow','follower','favoritePosts','profile','posts','keepPosts')"

			)
	res.status(200).json(
		users
	);
};
