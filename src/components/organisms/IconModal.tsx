import React, { useState } from "react";
import Portal from "../molecules/Portal";
import styles from "./iconModal.module.css";

type Props = {
  close: (e: any) => void; // toggleModal を受け取る
  children: React.ReactNode; // 子コンポーネントを受け取る
};

const IconModal: React.FC<Props> = props => {
  const [isMouseDown, setIsMouseDown] = useState(false);

  const onMouseDown = (e:any) => {
    if (e.target === e.currentTarget) {
      setIsMouseDown(true);
    }
  };

  const onMouseUp = (e:any) => {
    if (isMouseDown) {
      props.close(e);
    }
    setIsMouseDown(false);
  };

  return (
    <Portal>
      <div
        className={styles.modal}
        onMouseDown={onMouseDown}
        onMouseUp={onMouseUp}
      >
        { /* パネルの外をクリックでクローズ */}
        {/* cloneElementでchildrenであるPanelにpropsを渡す */}
        <div>
          {React.cloneElement(props.children as any, {
            close: props.close
          })}
        </div>
      </div>
    </Portal>
  );
};

export default IconModal;
