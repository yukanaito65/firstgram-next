import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase";
import AddFollowButton from "./addFollowButton";


function RemoveFollowButton() {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");
  const [followBtn, setFollowBtn] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        <></>;
      } else {
        setUser(currentUser);
      }
    });
  }, []);

    //各ページからuser_idを引き継ぎ、userIdに代入
    const router = useRouter();
    const userId = router.query.userId;
    console.log(userId);

  const remove = () => {
    fetch("/api/removeFollow", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
        // profileのuseridを格納したい
          follow_user_id:userId,
          user_id: user.uid
        }),
      })

      fetch("/api/removeFollower", {
        method: "PUT",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          follower_user_id: user.uid,
        // profileのuseridを格納したい
          user_id:userId
        }),
      })

    setFollowBtn(false)
  };

  return (
     <>
      {followBtn === true ? (
        <>
          <button  onClick={remove}
          className="border border-blue-500 rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-blue-500
        ">
            フォロー中
          </button>
        </>
      ) : (
      <AddFollowButton />
      )}
    </>
)
}

export default RemoveFollowButton;
