import { forwardRef, useEffect, useState } from "react";
import styled from "styled-components";
import LoadingBox from "../LoadingBox";
import NotificationItem from "../NotificationItem";
import { INotification } from "../../interfaces/ISlices";
import { notificationsGet } from "../../api/profile";

type Props = {
  isActive: boolean;
};

const NotificationsPanel = forwardRef<HTMLDivElement, Props>(
  ({ isActive }: Props, ref) => {
    useEffect(() => {
      if (isActive) {
        setLoading(true);

        notificationsGet({})
          .then((r) => {
            setNotifications(r);
            setHasmore(r.length == 12);
          })
          .catch(() => setHasmore(false))
          .finally(() => setLoading(false));
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

    return (
      <Container className={isActive ? "active" : ""} ref={ref}>
        <div className="upside">
          <h1>Notifications</h1>
        </div>
        <ul onScroll={onScroll}>
          {notifications.map((n) => {
            return <NotificationItem key={n.id} n={n} />;
          })}
          {loading && <LoadingBox />}
        </ul>
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
  .upside {
    padding: 24px;
    h1 {
      font-size: 24px;
      line-height: 28px;
    }
  }
  ul {
    height: calc(100% - 80px);
    overflow-y: auto;
    padding: 0px 24px;
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
    .loading-box {
      margin: 2rem 0px;
    }
  }
`;

export default NotificationsPanel;
