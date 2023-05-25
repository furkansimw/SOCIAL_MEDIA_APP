import { FC } from "react";
import Helmet from "react-helmet";

type PropsTitle = {
  title: string;
};

const Title: FC<PropsTitle> = ({ title }) => {
  title = "| " + title;
  return (
    <Helmet>
      <title>Social Media App {title}</title>
    </Helmet>
  );
};

export default Title;
