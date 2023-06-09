import { FC } from "react";
import { shallowEqual, useSelector } from "react-redux";
import {
  selectIsLoggedin,
  selectValues,
  toggleSetLoginPopupActive,
} from "../../redux/profileReducer";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";

type Props = {
  info: {
    username: string;
    ispublic: boolean;
    status: number | null;
  };
};

const Priv: FC<Props> = ({ info }) => {
  const { username: myusername } = useSelector(selectValues, shallowEqual);
  const { username, ispublic, status } = info;
  const isloggedin = useSelector(selectIsLoggedin, shallowEqual);
  const dispatch = useDispatch<AppDispatch>();
  const loginHandle = () => dispatch(toggleSetLoginPopupActive());
  if (username == myusername) return null;
  if (status != 0 && !ispublic)
    return (
      <div className="priv">
        {isloggedin ? (
          <>
            <p>This Account is Private</p>
            <p> Follow to see their photos.</p>
          </>
        ) : (
          <>
            <p>
              This Account is Private Already follow
              <span className="us">{username}</span>
            </p>
            <p>
              <span onClick={loginHandle}>Log in</span> to see their photos.
            </p>
          </>
        )}
      </div>
    );

  return null;
};

export default Priv;
