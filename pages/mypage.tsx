import Link from 'next/link';
import React from 'react'
import useSWR,{useSWRConfig} from 'swr';
import Header from '../src/components/organisms/header';


const fetcher = (resource:any) => fetch(resource).then((res) => res.json());

const Mypage = ()=> {
    const {data, error} = useSWR(`/api/users/`,fetcher);

    console.log(data);
    const { mutate } = useSWRConfig();

    if(error) return <div>failed to load</div>;
    if(!data) return <div>loading...</div>;

  return (
    <>
    <Header />
    <div>mypage</div>
    {data.map((item:any)=>{
            return(
            <>
    <Link href={`/users/${item.userid}`}>設定</Link>
    </>
            )})}
    </>
  )
}

export default Mypage
