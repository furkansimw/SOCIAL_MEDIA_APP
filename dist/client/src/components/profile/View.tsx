import { FC, useEffect, useState } from "react";
import { IView } from "../../interfaces/ISlices";
import { followUserS, getRelationships } from "../../api/profile";
import { selectValues } from "../../redux/profileReducer";
import { shallowEqual } from "react-redux";
import { useSelector } from "react-redux";
import { CloseIcon } from "../Icons";
import UnfollowPopup from "../../pages/UnfollowPopup";
import LoadingBox from "../LoadingBox";
import LinkQ from "../post/LinkQ";
import { disableRightClick } from "../navigation/Navigation";
import styled from "styled-components";

type Props = {
  quit: () => void;
  type: "followers" | "followings";
  userid: string;
};

const Views: FC<Props> = ({ quit, type, userid }) => {
  const [loading, setLoading] = useState(true);
  const [hasmore, setHasmore] = useState(true);
  const [relationships, setRelationships] = useState<IView[]>([]);
  useEffect(() => {
    const worker = (e: KeyboardEvent) => {
      if (e.key == "Escape") quit();
    };
    window.addEventListener("keydown", worker);
    return () => {
      window.removeEventListener("keydown", worker);
    };
  }, []);

  useEffect(() => {
    getRelationships(userid, type)
      .then((r) => {
        setRelationships(r);
        setHasmore(r.length == 12);
      })
      .catch(() => setHasmore(false))
      .finally(() => setLoading(false));
  }, []);

  const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
    const { created: date, rid: id } = relationships[relationships.length - 1];

    if (loading || !hasmore) return;
    const { scrollTop, clientHeight, scrollHeight } = e.target as Element;
    if (scrollTop + clientHeight + 40 > scrollHeight) {
      setLoading(true);
      getRelationships(userid, type, { date, id })
        .then((r) => {
          setRelationships([...relationships, ...r]);
          setHasmore(r.length == 12);
        })
        .catch(() => setHasmore(false))
        .finally(() => setLoading(false));
    }
  };
  const con = (s: null | number) => {
    if (s == null) return `Follow`;
    if (s == 0) return `Following`;
    if (s == 1) return `Requested`;
    return ``;
  };

  const { username: myusername } = useSelector(selectValues, shallowEqual);

  const [p, _p] = useState<{
    active: boolean;
    process: () => void;
    data: {
      username: string;
      pp: string | null;
    };
  }>({
    active: false,
    process: () => {},
    data: { pp: null, username: "" },
  });

  const tap = (p: IView) => {
    const { status, ispublic, username, id, pp } = p;
    if (status == null) {
      // follow
      followUserS(id, true);
      const newLikes = relationships.map((l) => {
        if (l.username == username)
          return { ...l, status: ispublic ? 0 : 1 } as IView;
        return l;
      });
      setRelationships(newLikes);
    } else {
      followUserS(id, false);
      const process = () => {
        const newLikes = relationships.map((l) => {
          if (l.username == username)
            return { ...l, status: ispublic ? 0 : 1 } as IView;
          return l;
        });
        setRelationships(newLikes);
      };
      if (ispublic) process();
      else _p({ active: true, data: { username, pp }, process });
    }
  };

  return (
    <>
      <Bg onClick={quit} />
      <Container>
        <div className="headerxxx">
          <p>{type}</p>
          <button onClick={quit}>
            <CloseIcon />
          </button>
        </div>
        {p.active && (
          <UnfollowPopup
            data={p.data}
            close={() => _p({ ...p, active: false })}
            process={p.process}
          />
        )}
        <ul onScroll={onScroll} className="contentx">
          {relationships.map((obj) => (
            <li key={obj.rid}>
              <LinkQ onClick={quit} className="pp" to={`/${obj.username}`}>
                <img
                  onContextMenu={disableRightClick}
                  src={obj.pp || "/pp.jpg"}
                  alt="pp"
                />
              </LinkQ>
              <div className="text">
                <LinkQ onClick={quit} to={`/${obj.username}`}>
                  <p className="username">{obj.username}</p>
                </LinkQ>
                {obj.fullname && <p className="fullname">{obj.fullname}</p>}
              </div>
              {obj.username != myusername && (
                <button className={con(obj.status)} onClick={() => tap(obj)}>
                  {con(obj.status)}
                </button>
              )}
            </li>
          ))}
          {loading && <LoadingBox />}
        </ul>
      </Container>
    </>
  );
};

const Bg = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  width: 200vw;
  height: 200vh;
  position: fixed;
  top: 0px;
  left: 0px;
  z-index: 1300;
  transform: translate(-10%, -10%);
`;

const Container = styled.div`
  transform: scale(1.2);
  @keyframes scx {
    from {
      transform: scale(1.2);
    }
    to {
      transform: scale(1);
    }
  }
  animation: scx 0.1s ease-in-out forwards;
  width: 400px;
  background-color: #262626;
  border-radius: 8px;
  height: 400px;
  position: fixed;
  z-index: 1400;
  left: calc(50% - 200px);
  top: calc(50% - 200px);
  border-radius: 1rem;
  .headerxxx {
    height: 42px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    font-weight: 600;
    border-bottom: 1px solid #363636;
    button {
      width: 2rem;
      height: 2rem;
      position: absolute !important;
      right: 10px;
    }
  }
  .contentx {
    height: calc(100% - 42px);
    overflow-y: auto;
    display: block;
    padding: 0px;
    .loading-box {
      margin: 2rem 0px;
      position: relative;
      height: 2rem;
      background-color: transparent;
    }
    li {
      display: flex;
      height: 60px;
      padding: 0.5rem 1rem;
      align-items: center;
      .pp {
        width: 44px;
        height: 44px;
        margin-right: 12px;
        display: block;
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
        }
      }
      .text {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        height: 36px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          line-height: 18px;
          font-size: 14px;
          margin: 0px;
          &.username {
            font-weight: 600;
          }
          &.fullname {
            color: #a8a8a8;
            font-weight: 400;
          }
        }
      }
      button {
        margin-left: 12px;
        padding: 7px 1rem;
        border-radius: 8px;
        background-color: #fafafa;
        color: #000;
        font-size: 14px;
        font-weight: 600;
        &:hover {
          opacity: 0.8;
        }
        &.Follow {
          background-color: #0095f6;
          color: #fafafa;
        }
      }
    }
  }
  @media screen and (max-width: 464px) {
    left: 2rem;
    width: calc(100% - 4rem);
  }
  @media screen and (max-height: 464px) {
    top: 2rem;
    max-height: calc(100% - 4rem);
  }
`;

export default Views;
