import React, { FC, useEffect, useState } from "react";
import styled from "styled-components";
import { BigLeftArrow } from "../Icons";
import { IFollowRequest } from "../../interfaces/ISlices";
import { followRequests, requestAction } from "../../api/profile";
import { Link } from "react-router-dom";
import LoadingBox from "../LoadingBox";

type Props = {
  isActive: boolean;
  close: () => void;
};

const FollowRequests: FC<Props> = ({ isActive, close }) => {
  useEffect(() => {
    if (!isActive) return;
    _d([]);
    setLoading(true);
    setHasmore(true);

    followRequests({ l: false })
      .then((r) => {
        setHasmore(r.length == 12);
        _d(r);
      })
      .finally(() => setLoading(false));
  }, [isActive]);

  const [hasmore, setHasmore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [d, _d] = useState<IFollowRequest[]>([]);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as Element;

    if (!hasmore || loading) return;

    if (scrollTop + 100 + clientHeight >= scrollHeight) {
      const date = d[d.length - 1].created,
        id = d[d.length - 1].id;

      followRequests({ l: false, date, id })
        .then((r) => {
          setHasmore(r.length == 12);
          _d([...d, ...r]);
        })
        .finally(() => setLoading(false));
    }
  };

  const confirmF = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ri: string
  ) => {
    e.preventDefault();
    requestAction(ri, true).then(() => {
      const newD = d.map((a) => {
        if ((a.id = ri)) return { ...a, isallowed: true };
        return a;
      });
      _d(newD);
    });
  };

  const denyF = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ri: string
  ) => {
    e.preventDefault();
    requestAction(ri, true);
    const newD = d.filter((a) => a.id != ri);
    _d(newD);
  };

  return (
    <Container className={isActive ? "a" : ""}>
      <div className="up">
        <button onClick={close}>
          <BigLeftArrow />
        </button>
        <p>Follow requests</p>
      </div>
      <ul onScroll={onScroll}>
        {d.map((requestitem) => (
          <li key={requestitem.id} onClick={close}>
            <Link to={`/${requestitem.username}`}>
              <img className="pp" src={requestitem.pp || "/pp.jpg"} alt="pp" />
              <div className="text">
                <p className="u">{requestitem.username}</p>
                {requestitem.fullname && (
                  <p className="fn">{requestitem.fullname}</p>
                )}
              </div>
              {requestitem.isallowed ? (
                <>
                  <button className={requestitem.status == null ? "f" : ""}>
                    {requestitem.status == null
                      ? "Follow"
                      : requestitem.status == 0
                      ? "Following"
                      : "Requested"}
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={"confirm"}
                    onClick={(e) => confirmF(e, requestitem.id)}
                  >
                    Confirm
                  </button>
                  <button
                    className={"delete"}
                    onClick={(e) => denyF(e, requestitem.id)}
                  >
                    Delete
                  </button>
                </>
              )}
            </Link>
          </li>
        ))}
        {loading && <LoadingBox />}
      </ul>
    </Container>
  );
};

const Container = styled.ul`
  width: 0px;
  overflow: hidden;
  transition: 0.3s ease-in-out all;
  height: 100%;
  overflow-y: auto;
  &.a {
    width: 100%;
  }
  padding: 1rem 0px;
  .up {
    height: 48px;
    position: relative;
    padding: 8px 1rem;
    margin-top: 4px;
    button {
      position: absolute;
      left: 28px;
      top: 8px;
      svg {
        transform: rotate(-90deg);
      }
    }
    p {
      font-weight: 700;
      width: 100%;
      text-align: center;
    }
  }
  ul {
    width: 100%;
    height: calc(100% - 58px);
    overflow-y: auto;
    overflow-x: hidden;
    &:hover {
      &::-webkit-scrollbar-thumb {
        background-color: #363636;
      }
      &::-webkit-scrollbar {
        background-color: #202020;
      }
    }
    &::-webkit-scrollbar {
      width: 8px;
    }
    &::-webkit-scrollbar-thumb {
      width: 8px;
      border-radius: 8px;
      background-color: transparent;
      &:active {
        background-color: #484848;
      }
    }
    li {
      white-space: nowrap;
      width: 366px;
      a {
        display: flex;
        padding: 10px 24px;
        align-items: center;
        width: 100%;
        &:hover {
          background-color: #161616;
        }
        .pp {
          width: 2rem;
          height: 2rem;
          border-radius: 100%;
          margin-right: 12px;
        }
        .text {
          width: 100%;
          white-space: pre-wrap;
          font-size: 14px;
          max-lines: 2;
          height: 36px;
          line-height: 18px;
          overflow: hidden;
          text-overflow: ellipsis;
          display: flex;
          justify-content: center;
          flex-direction: column;
          p {
            font-weight: 600;
            padding: 0px;
            display: inline-block;
            margin-right: 4px;
            width: min-content;
            &.fn {
              color: #a8a8a8;
            }
          }
        }
        button {
          font-size: 14px;
          border-radius: 8px;
          padding: 7px 1rem;
          background-color: #fafafa;
          color: #000;
          margin-left: 8px;
          font-weight: 600;
          &.confirm {
            background-color: #0095f6;
            color: #fafafa;
          }
          &.f {
            background-color: #0095f6;
            color: #fafafa;
          }
        }
      }
    }
    .loading-box {
      margin: 1rem 0px;
    }
  }
`;

export default FollowRequests;
