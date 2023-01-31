import { onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import React, {
  DetailedHTMLProps,
  InputHTMLAttributes,
  MutableRefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import useSWR from "swr";
import { auth } from "../firebase";
import Header from "../src/components/organisms/header";
import MobileFooter from "../src/components/organisms/MobileFooter";
import MobileHeader from "../src/components/organisms/MobileHeader";
import { getWindowSize } from "../src/components/utils/GetWindowSize";
import { User } from "../types/types";

const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function SearchPage() {
  //uid
  const [currentUser, setCurrentUser] = useState<string>("");
  const [loading, setLoading] = useState(true);
  const [userData, setUserData] = useState([]);
  const [searchQuery, setSearchQuery] = useState<
    { user_id: string; name: string; user_name: string; icon_img: string }[]
  >([]);
  // const [searchQuery, setSearchQuery] = useState<any[]>([]);

  const ref: any = useRef();

  const { data: users, error } = useSWR(`/api/users`, fetcher);
  // console.log(users)

  //取得したデータをuserDataにセットする→users=userData
  // useEffect(()=> {
  //   setUserData(users)
  //   console.log(userData)
  //   console.log(users)
  // },[])

  // const userDataArray: {
  //   userid: string;
  //   name: string;
  //   username: string;
  // }[] = [];

  // console.log(typeof userData)
  // console.log(userData)

  // userData.forEach((element:any) => {
  //   userDataArray.push({
  //     userid: element.userid,
  //     name: element.name,
  //     username: element.username,
  //   });
  // });
  useEffect(() => {
    //ログイン判定
    onAuthStateChanged(auth, async (user) => {
      if (!user) {
        <></>;
      } else {
        // ログインユーザーのid取得
        setCurrentUser(user.uid);
        setLoading(false);

      }
    });
  }, []);


  const handleSearch = () => {
    // 検索フォームに入力される内容
    console.log(ref.current.value);

    //usersテーブルの中のnameもしくはuser_nameが入力された内容と等しいデータを探してsearchQueryに格納
    setSearchQuery(
      users.filter(
        (user: User) =>
          user.name.toLowerCase().includes(ref.current.value.toLowerCase()) ||
          user.user_name.toLowerCase().includes(ref.current.value.toLowerCase())
      )
    );

    console.log(searchQuery);
  };
  console.log(searchQuery);

  // 画面サイズが変わるたびに state の windowDimensions にリアルタイムで反映され、幅、高さの値はそれぞれ windowDimensions.width と windowDimensions.height で取得できる
  // const getWindowDimensions = () => {
  //   if(typeof window !== "object"){
  //   const { innerWidth: width, innerHeight: height } = window;
  //   return {
  //     width,
  //     height
  //   };
  // }}

  // const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  // useEffect(() => {
  //   const onResize = () => {
  //     setWindowDimensions(getWindowDimensions());
  //   }
  //   window.addEventListener('resize', onResize);
  //   return () => window.removeEventListener('resize', onResize);
  // }, []);


  // console.log(windowDimensions.width);

  //getWindowSize()関数を呼び出してwindowサイズをリアルタイムで取得する
  const { height, width } = getWindowSize();
  console.log(width)

  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  return (
    <>
    {!loading && (
    <div className="md:flex">
      {width > 768 ? (
      <Header />
      ): (
        <MobileHeader />
      )}
      <div
        className="md:ml-96 md:my-8 md:w-3/5 bg-white md:border md:border-solid md:border-neutral-300 items-center"
        style={{ height: "650px" }}
      >
        <div className="font-bold text-4xl mt-10 ml-10">検索</div>
        <input
          type="text"
          ref={ref}
          onChange={() => handleSearch()}
          placeholder="検索"
          className="h-16 border-none bg-gray-100 rounded-lg w-7/12 mt-12 mb-4 ml-10 text-xl"
        />
        <hr className="border-gray-300 border border-solid" />
        <div className="overflow-y-scroll overflow-x-hidden">
          {searchQuery.length > 0 ? (
            <>
              {searchQuery.map((user: any) => (
                <>
                <Link href={{ pathname:user.user_id === currentUser ? "/myPage" :"/profile",
                query: {userId : user.user_id}}}>
                <div
                  key={user.user_id}
                  className="flex gap-5 items-center my-5 ml-10"
                >
                  <div className="w-28 h-28">
                    {user.icon_img !== "" ? (
                      <img
                        src={user.icon_img}
                        alt="icon"
                        // width={80}
                        // height={80}
                        className="bg-white rounded-full border border-solid border-gray-200 object-cover w-full h-full"
                      />
                    ) : (
                      <Image
                        src="/noIcon.png"
                        alt="icon"
                        width={30}
                        height={30}
                        className="bg-gray-200 rounded-full border border-solid border-gray-200  object-cover w-full h-full"
                      />
                    )}
                  </div>
                  <div>
                    <p className="font-bold m-0">{user.user_name}</p>
                    <p className="text-gray-500 m-0">{user.name}</p>
                  </div>
                </div>
                </Link>
                </>
              ))}
            </>
          ) : (
            <div className="text-center mt-20">
              <p>該当するユーザーがいません</p>
            </div>
          )}
        </div>
      </div>
      {width > 768 ? (
        <></>
      ): (
        <MobileFooter />
      )}
    </div>
    )}
    </>
  );
}

export default SearchPage;
