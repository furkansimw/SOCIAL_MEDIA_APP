import React, { FC, memo } from "react";

type props = {
  messagegroupid: string;
  setMessagegroupid: React.Dispatch<React.SetStateAction<string | undefined>>;
};

const MessagesContent: FC<props> = ({ messagegroupid, setMessagegroupid }) => {
  return <div>MessagesContent</div>;
};

export default memo(MessagesContent);
