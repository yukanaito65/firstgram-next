import React from "react";
import useSWR from "swr";
import { User } from "../types/types";
import data from "./api/data";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

const Setting = () => {
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
    <div>
      <div>
        <p>icon</p>
        <p>{users[0].userName}</p>
      </div>
      <div>
        <div>
          <p>現在のパスワード</p>
          <input type="password" />
        </div>
        <div>
          <p>新しいパスワード</p>
          <input type="password" />
        </div>
        <div>
          <p>新しいパスワードを確認</p>
          <input type="password" />
        </div>
      </div>
      <button>パスワード変更</button>
    </div>
  );
};

export default Setting;
