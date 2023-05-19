import { memo, useState } from "react";

const Text = ({ state }: { state: number }) => {
  console.log("text componenti render oldu");

  return (
    <>
      <h1>Furkan {state}</h1>
    </>
  );
};

export default memo(Text);
