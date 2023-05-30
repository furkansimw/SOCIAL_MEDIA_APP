import { FC } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { AppDispatch } from "../../redux/store";
import { setBack } from "../../redux/postsReducer";

type Props = {
  children: any;
  to: string;
  className?: string;
};

const LinkQ: FC<Props> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const closex = () => dispatch(setBack(null));
  return (
    <Link to={props.to} className={props.className} onClick={closex} replace>
      {props.children}
    </Link>
  );
};

export default LinkQ;
