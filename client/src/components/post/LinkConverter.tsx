import React, { memo } from "react";
import { Link } from "react-router-dom";
import dompurify from "dompurify";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { setBack } from "../../redux/postsReducer";
import LinkQ from "./LinkQ";

const LinkConverter = ({ text }: { text: string }) => {
  const dispatch = useDispatch<AppDispatch>();
  const manipulate = () => {
    const ctext = dompurify.sanitize(text);
    const words = ctext.split(/(\s+)/);
    return words.map((word, index) => {
      if (word.startsWith("@") && word.endsWith("")) {
        const username = word.slice(1);
        const to = `/${username}`;
        return (
          <React.Fragment key={index}>
            <LinkQ className="b" to={to}>
              {word}
            </LinkQ>
          </React.Fragment>
        );
      } else return <React.Fragment key={index}>{word} </React.Fragment>;
    });
  };

  return <>{manipulate()}</>;
};

export default memo(LinkConverter);
