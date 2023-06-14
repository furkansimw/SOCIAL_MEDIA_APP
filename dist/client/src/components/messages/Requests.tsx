import React, { useEffect } from "react";
import { styled } from "styled-components";

const Requests = ({ isactive }: { isactive: boolean }) => {
  useEffect(() => {
    if (isactive) {
      // todo
    }
  }, [isactive]);

  return (
    <Contianer className="requests coolsb">
      <h1>Requests</h1>
    </Contianer>
  );
};

const Contianer = styled.div`
  height: 100vh;
  width: 100%;
`;

export default Requests;
