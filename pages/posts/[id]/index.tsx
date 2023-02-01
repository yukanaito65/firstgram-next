import { useRouter } from "next/router";

  const PostPage = () => {
    const router = useRouter();
    const id = router.query.id;
    return (
      <>
      {id}
      </>
    )
  }
  export default PostPage;
