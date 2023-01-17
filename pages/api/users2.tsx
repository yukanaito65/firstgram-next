import { NextApiRequest, NextApiResponse } from "next";
import { sqlExecuter } from "../../modules/database";
import { User } from "../../types/types";

export type UsersApiResponse = {
  user? : User
  debugMessage?: string
}

export const usersApi=async(
  req:NextApiRequest,
  res: NextApiResponse<UsersApiResponse>
):void =>{
  const id = req.query.userid as string
  const user = fetchUserData(id)
  if(user){
    res.status(200).json({user})
  }else{
    res.status(400).json({debugMessage: `User [id=${id}] not found`})
  }
}

// const fetchUserData = (id:string):User | undefined =>{
//   const users:User[] =  sqlExecuter.any(
//                   "SELECT * FROM users"
//             ).then((user) => {
//               users.find((user)=> user.userid === id )
//             })
// }

const fetchUserData = (id:any)=>{
  const users:User[] = sqlExecuter.any(
    "SELECT * FROM users"
  );
  // res.status(200).json(users);
   return users.find((user)=> user.userid ===id )
  }
