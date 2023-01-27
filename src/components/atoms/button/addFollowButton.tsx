import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth } from "../../../../firebase";
import RemoveFollowButton from "./RemoveFollowButton";


function AddFollowButton() {
  //ログインしているとログイン情報を持つ
  const [user, setUser] = useState<any>("");
  const [followBtn, setFollowBtn] = useState(true)

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser: any) => {
      if (!currentUser) {
        <></>;
      } else {
        setUser(currentUser);
      }
    });
  }, []);

  const add = () => {
    fetch(`api/addFollow`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        // profileのuseridを格納したい
        follow_user_id: "1234567890123456789012345678",
        user_id: user.uid,
      }),
    }).then((res) => res.json());

    fetch(`api/addFollower`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        follower_user_id: user.uid,
         // profileのuseridを格納したい
        user_id: "1234567890123456789012345678",
      }),
    }).then((res) => res.json());

    setFollowBtn(false)
  };

  return (
     <>
      {followBtn === true ? (
        <>
          <button  onClick={add}
          className="border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100
        ">
            フォローする
          </button>
        </>
      ) : (
      // <RemoveFollowButton />
      <button  
      className="border border-gray-100  rounded  ml-5 h-8 px-3 py-1 text-sm font-bold bg-gray-100
    ">
        フォロー中
      </button>
      )}
    </>
)
}

export default AddFollowButton;
