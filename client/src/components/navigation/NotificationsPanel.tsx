import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingBox from "../LoadingBox";
import NotificationItem from "../NotificationItem";
import { INotification } from "../../interfaces/ISlices";
import { notificationsGet } from "../../api/profile";
import { followRequests } from "../../api/profile";
import { SmallRightIconFRFor } from "../Icons";

type Props = {
  isActive: boolean;
  closepanel: () => void;
};

const NotificationsPanel = forwardRef<HTMLDivElement, Props>(
  ({ isActive, closepanel }: Props, ref) => {
    const [lastrequest, setLastRequest] = useState<any>(null);

    useEffect(() => {
      setFr(false);
      if (isActive) {
        setLoading(true);
        followRequests({ l: true }).then((lr) =>
          notificationsGet({}).then((r) => {
            setLastRequest(lr.length == 1 ? lr[0] : null);
            setNotifications(r);
            setHasmore(r.length == 12);
            setLoading(false);
          })
        );
      }
    }, [isActive]);

    const [notifications, setNotifications] = useState<INotification[]>([]);
    const [loading, setLoading] = useState(true);
    const [hasmore, setHasmore] = useState(true);

    const onScroll = (e: React.UIEvent<HTMLUListElement, UIEvent>) => {
      e.preventDefault();

      const { scrollTop, scrollHeight, clientHeight } = e.target as Element;
      if (!hasmore || loading) return;
      if (scrollTop + 100 + clientHeight >= scrollHeight) {
      }
    };
    const [fr, setFr] = useState(false);

    const setNotificationViewOpen = () => setFr(true);

    return (
      <Container className={isActive ? "active" : ""} ref={ref}>
        <div className={`ctx ${fr ? "fr" : ""}`}>
          <div className="upside">
            <h1>Notifications</h1>
          </div>
          <ul onScroll={onScroll}>
            {lastrequest && (
              <div className="lastrequest" onClick={setNotificationViewOpen}>
                <img src={lastrequest?.pp || "/pp.jpg"} alt="lrpp" />
                <div className="text">
                  <p className="fr">Follow request</p>
                  <p className="u">{lastrequest?.username}</p>
                </div>
                <span>
                  <div className="dot"></div>
                  <SmallRightIconFRFor />
                </span>
              </div>
            )}
            {notifications.map((n) => {
              return (
                <NotificationItem key={n.id} n={n} closepanel={closepanel} />
              );
            })}
            {loading && <LoadingBox />}
          </ul>
        </div>
      </Container>
    );
  }
);

const Container = styled.div`
  position: absolute;
  width: 440px;
  height: 100vh;
  left: -440px;
  top: 0px;
  background-color: #000;
  transition: 0.3s ease-in-out all;
  padding-left: 73px;
  border-right: 1px solid #262626;
  box-shadow: 4px 0 24px rgba(0, 0, 0, 0.15);
  border-radius: 0px 1rem 1rem 0px;
  z-index: 10;
  overflow: hidden;
  &.active {
    left: 0px;
  }
  .ctx {
    height: 100%;
    overflow: hidden;
    width: 100%;
    transition: 0.3s ease-in-out all;
    &.fr {
      width: 0px;
    }
    .upside {
      padding: 24px;
      h1 {
        font-size: 24px;
        line-height: 28px;
        white-space: nowrap;
      }
    }
    ul {
      height: calc(100% - 80px);
      overflow-y: auto;
      &::-webkit-scrollbar {
        width: 8px;
        background-color: #101010;
      }
      &::-webkit-scrollbar-thumb {
        width: 8px;
        background-color: #363636;
        border-radius: 8px;
        &:active {
          background-color: #464646;
        }
      }
      .lastrequest {
        padding: 8px 24px;
        width: 100%;
        display: flex;
        align-items: center;
        white-space: nowrap;
        cursor: pointer;
        &:hover {
          background-color: #161616;
        }
        img {
          width: 44px;
          height: 44px;
          border-radius: 100%;
          margin-right: 14px;
        }
        .text {
          width: 100%;
          p {
            font-size: 14px;
            font-weight: 400;
            color: #a8a8a8;
            line-height: 18px;
            &.fr {
              line-height: 12px;
              font-weight: 700;
              color: #fafafa;
            }
          }
        }
        span {
          display: flex;
          align-items: center;
          .dot {
            border-radius: 100%;
            margin: 0px 8px;
            width: 8px;
            height: 8px;
            background-color: #0095f6;
          }
          svg {
            transform: rotate(90deg);
          }
        }
      }
      .loading-box {
        margin: 2rem 0px;
      }
    }
  }
`;

export default NotificationsPanel;
