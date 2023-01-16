import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react'
import useSWR from "swr";


const fetcher = (resource: string) => fetch(resource).then((res) => res.json());

function SearchPage2() {

  const [userData, setUserData] = useState([]);
  const [searchQuery,setSearchQuery] = useState<{userid: string; name: string; username: string}[]>([]);
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
      users.filter((user)=>user.name.toLowerCase().includes(ref.current.value.toLowerCase())||user.username.toLowerCase().includes(ref.current.value.toLowerCase()))
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
    <div>
      <div>
        <div className="font-bold">検索</div>
        <input
        type="text"
        ref={ref}
        onChange={()=>handleSearch()}
        placeholder="検索"
        className="h-8 border-none bg-gray-100 rounded w-7/12"
        />
          <hr className="border-gray-300 border border-solid" />
        <div>
          {searchQuery.map((user)=>(
            // <Link href="/mypage">
            <div key={user.userid}>
              {/* <Image src={user.icon} alt="icon" width={80} height={80}></Image> */}
              <p className="font-bold">{user.username}</p>
              <p className='text-gray-500'>{user.name}</p>
            </div>
            // </Link>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SearchPage2
