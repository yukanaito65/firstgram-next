import { NextApiRequest, NextApiResponse } from "next";
import { sqlExecuter } from "../../../modules/database";
import { User } from "../../../types/types";

export type UsersApiResponse = {
  user? : User
  debugMessage?: string
}

export default function usersApi(
  req:NextApiRequest,
  res: NextApiResponse<UsersApiResponse>
):void {
  const id = req.query.id as string
  const user = fetchUserData(id)
  if(user){
    res.status(200).json({user})
  }else{
    res.status(400).json({debugMessage: `User [id=${id}] not found`})
  }
}

const fetchUserData = async(id:string): User | undefined=>{
  const users =  await sqlExecuter.any(
    "SELECT * FROM users"
  );
  // res.status(200).json(users);
  return users.find((user)=> user.userid ===id )
  }
