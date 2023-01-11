import React from "react";
import useSWR from "swr";
import { User } from "../types/types";
import data from "./api/data";
import SettingMenu from "../src/components/organisms/SettingMenu";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const PasswordChange = () => {
  const { data: users, error } = useSWR("/api/users", fetcher);
  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }
  console.log("data", users);
  // return users.map(
  //   (d: User, index:number) => <div>{index}番目のデータ: {JSON.stringify(d)}</div>
  // )
  return (
    <div className="flex gap-12 border border-solid border-neutral-300">
    <SettingMenu />
    <div className="flex flex-col gap-2.5 w-full">
      <div className="flex items-center gap-8">
        <p>icon</p>
        <p>{users[0].userName}</p>
      </div>
      <div>
        <div className="flex items-center gap-8">
          <p className="font-bold">現在のパスワード</p>
          <input type="password" className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12"/>
        </div>
        <div className="flex items-center gap-8">
          <p className="font-bold">新しいパスワード</p>
          <input type="password" className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12" />
        </div>
        <div className="flex items-center gap-8">
          <p className="font-bold text-right">新しいパスワード<br/>を確認</p>
          <input type="password" className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12" />
        </div>
      </div>
      <button className="w-32">パスワード変更</button>
    </div>
    </div>
  );
};

export default PasswordChange;
