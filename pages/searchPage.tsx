import React, { useEffect, useState } from "react";
import {
  getAuth,
  onAuthStateChanged,
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword as firebaseUpdatePassword,
} from "firebase/auth";
import { auth } from "../firebase";
import useSWR from "swr";
import { User } from "../types/types";
import Link from "next/link";
import Image from 'next/image'

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function SearchPage() {
  const [user, setUser] = useState<any>([]);

  //inputのvalue
  const [searchValue, setSearchValue] = useState("");

  //全userのデータを管理
  const [dataList, setDataList] = useState<
    { userid: string; name: string; username: string }[]
  >([]);

  // 最終的にmapで回して表示する検索結果のuser情報の管理
  const [dataArr, setDataArr] = useState<
    { userid: string; name: string; username: string; icon: string }[]
  >([]);

  // 取得した全userのuserid,name,usernameを入れる箱。useSWRのusersは上記3つの項目以外(profileなど)も含まれている
  const userDataList: {
    userid: string;
    name: string;
    username: string;
  }[] = [];

  const { data: users, error } = useSWR(`/api/users`, fetcher);

  console.log(users)

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        console.log("ログアウト状態");
      } else {
        setUser(currentUser);
      }
      setDataList(users);
    });
  });

  console.log(dataList);
  dataList.forEach((element) => {
    userDataList.push({
      userid: element.userid,
      name: element.name,
      username: element.username,
    });
  });
  console.log(userDataList);

  //「検索」クリック時にinputタグ内の文字と一致するユーザーのuserIdを配列に格納
  // 格納されたuserIdの任意の情報を取得
  const onClickSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 検索に引っかかったuserのuserIdを格納
    const searchResultList: string[] = [];
    dataList.forEach((user) => {
      const userName = user.username;
      const name = user.name;
      const userId = user.userid;
      if (userName.includes(searchValue)) {
        searchResultList.push(userId);
      } else if (name.includes(searchValue)) {
        searchResultList.push(userId);
      }
    });

    // 検索に引っかかったuserの任意情報を格納　ヒットしたuserの情報だけ格納
    const userDataArr: {
      userid: string;
      name: string;
      username: string;
      icon: string;
    }[] = [];

    //検索にヒットした(searchResultListに検索にヒットしたuseridが格納されている)userの情報を取得し、userDataArrに格納する
    for (const userId of searchResultList) {
      console.log(userId); //このuserIdのuserデータを取得する必要がある。
      const resultUser = users.find((user: User) => user.userid === userId);

      if (resultUser) {
        userDataArr.push({
          userid: resultUser.userid,
          name: resultUser.name,
          username: resultUser.username,
          icon: resultUser.icon,
        });
      }
      setDataArr(userDataArr);
    }
  };
  //一致していない入力内容がはいっていても全件表示される、１文字目の時も全件表示。該当するものがある時かつ2文字以上入力すると正しい表示になる。入力したものを消しても変化しない
  // const handleChange = (e:any) => {
  //   setSearchValue(e.target.value);
  //   onClickSearch(e);
  // };

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  return (
    <div>
      <div>検索</div>
      <div>
        <form onSubmit={(e) => onClickSearch(e)}>
          <div>
            <input
              type="search"
              placeholder="検索"
              className="h-8 border-gray-300 border-solid border bg-gray-50 rounded w-7/12"
              value={searchValue}
              // onChange={(e) => setSearchValue(e.target.value)}
              onChange={(e) => setSearchValue(e.target.value)}
            />
            <button onClick={() => onClickSearch}>検索</button>
          </div>
        </form>
      </div>

      <hr className="border-gray-300 border border-solid" />

      <div>
        {dataArr.length > 0 ? (
          dataArr.map((userData) => {
            return (
              <>
                <Link href="/mypage">
                  {/* <Image src={userData.icon} alt= "icon" width={80} height={80} /> */}
                  <div>
                    <p>{userData.username}</p>
                    <p>{userData.name}</p>
                  </div>
                </Link>
              </>
            );
          })
        ) : (
          <div>
            <p>該当するユーザーがいません</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
