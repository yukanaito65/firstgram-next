import { getAllJsonPostIds, getJsonPostData } from "../lib/json";
import { GetStaticProps, GetStaticPaths } from 'next'

//posts/1などのpathを用意する
export async function getStaticPaths() {
    const paths = await getAllJsonPostIds();
    return {
      paths,
      //idがない場合は404になるようにfalse
      fallback: false,
    };
  }
  
  //上のpathから拾ってきたデータをpropsとして下のコンポーネントに渡す。
  export async function getStaticProps({
    params,
  }: {
    params: { id: string };
  }) {
    console.log(params);
    const jsonData = await getJsonPostData(params.id);
    return {
      props: {
        //jsonDataに格納
        jsonData,
      },
    //   revalidate: 10,
    };
  }

  export default function Blog({props}: {props:any}) {
    console.log(props);
    return (
      <ul>
        
      </ul>
    )
  }
