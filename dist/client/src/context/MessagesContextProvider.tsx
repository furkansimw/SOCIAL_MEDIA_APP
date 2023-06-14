import React, { createContext, useContext, useState } from "react";
import { IRoom } from "../interfaces/IMessages";

const MessageContext = createContext<{
  rooms: IRoom[];
  setRooms: React.Dispatch<React.SetStateAction<IRoom[]>>;
  setHasmore: React.Dispatch<React.SetStateAction<boolean>>;
  hasmore: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}>({
  rooms: [],
  setRooms: function (value: React.SetStateAction<IRoom[]>): void {
    throw new Error("Function not implemented.");
  },
  hasmore: true,
  setHasmore: function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
  loading: false,
  setLoading: function (value: React.SetStateAction<boolean>): void {
    throw new Error("Function not implemented.");
  },
});

export const GetMessageContext = () => useContext(MessageContext);

const MessagesContextProvider = (props: any) => {
  const [rooms, setRooms] = useState<IRoom[]>([]);
  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(true);
  const value = { rooms, setRooms, loading, setLoading, hasmore, setHasmore };

  return (
    <MessageContext.Provider value={value}>
      {props.children}
    </MessageContext.Provider>
  );
};

export default MessagesContextProvider;
