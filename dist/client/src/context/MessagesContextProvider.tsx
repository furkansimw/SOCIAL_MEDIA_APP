import React, { createContext, useContext, useState } from "react";
import { IRoom } from "../interfaces/IMessages";

const MessageContext = createContext<{
  rooms: IRoom[];
  setRooms: React.Dispatch<React.SetStateAction<IRoom[]>>;
}>({
  rooms: [],
  setRooms: function (value: React.SetStateAction<IRoom[]>): void {
    throw new Error("Function not implemented.");
  },
});

export const GetMessageContext = () => useContext(MessageContext);

const MessagesContextProvider = (props: any) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);

  const value = { rooms, setRooms };

  return (
    <MessageContext.Provider value={value}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessagesContextProvider;
