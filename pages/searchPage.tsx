import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import useSWR from "swr";
import Header from '../src/components/organisms/header';


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function SearchPage() {

  const [userData, setUserData] = useState([]);
  const [searchQuery,setSearchQuery] = useState<{user_id: string; name: string; user_name: string; icon_img: string}[]>([]);
  const ref = useRef();


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



  const handleSearch = ()=>{
    console.log(ref.current.value)

    setSearchQuery(
      users.filter((user)=>user.name.toLowerCase().includes(ref.current.value.toLowerCase())||user.user_name.toLowerCase().includes(ref.current.value.toLowerCase()))
    )
    // console.log(searchQuery)
  }


  if (error) {
    return <p>error!</p>;
  }
  if (!users) {
    return <p>loading...</p>;
  }

  return (
    <div className='flex'>
    <Header />
    <div className='ml-96 mr-3 my-6 w-3/4'>
      <div>
        <div className="font-bold text-2xl">検索</div>
        <input
        type="text"
        ref={ref}
        onChange={()=>handleSearch()}
        placeholder="検索"
        className="h-8 border-none bg-gray-100 rounded w-7/12 mt-12 mb-4"
        />
          <hr className="border-gray-300 border border-solid" />
        <div>
          {searchQuery.map((user)=>(
            // <Link href="/mypage">
            <div key={user.user_id} className="flex gap-5 items-center my-5">
              <div>
                {user.icon_img !== "" ? (
                  <img
                  src={user.icon_img}
                  alt="icon"
                  width={80}
                  height={80}
                  className="bg-gray-200 rounded-full"
                  />
                ) : (
                  <Image
                  src="/noIcon.png"
                  alt="icon"
                  width={40}
                  height={40}
                  className="bg-gray-200 rounded-full border border-solid border-gray-200 w-1/4 object-cover"
                  />
                )
               }
              </div>
              <div>
              <p className="font-bold m-0">{user.user_name}</p>
              <p className='text-gray-500 m-0'>{user.name}</p>
              </div>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
    </div>
  )
}

export default SearchPage
