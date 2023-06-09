import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { setBack } from "../../redux/postsReducer";

type Props = {
  children: any;
  to: string;
  className?: string;
  onClick?: () => void;
};

const LinkQ: FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const closex = () => {
    dispatch(setBack(null));
    if (props.onClick) props.onClick();
  };

  return (
    <Link onClick={closex} replace to={props.to} className={props.className}>
      {props.children}
    </Link>
  );
};

export default LinkQ;
