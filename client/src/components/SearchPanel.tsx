import { FormEvent, forwardRef, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { searchProfile } from "../api/profile";
import { SearchIcon2 } from "./Icons";

type Props = {
  isActive: boolean;
};

type ISearchL = {
  username: string;
  pp: string | null;
  fullname: string | null;
};

const NotificationsPanel = forwardRef<HTMLDivElement, Props>(
  ({ isActive }: Props, ref) => {
    const [state, setState] = useState("");
    const [focus, setFocus] = useState(false);
    const [searchL, setSearchL] = useState<ISearchL[]>([]);
    const [recent, setRecent] = useState<ISearchL[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      const a = localStorage.getItem("recent");
      inputRef.current?.focus();
      setState("");
      try {
        if (a) {
          const r = JSON.parse(a);
          setRecent(r);
        }
      } catch (error) {
        localStorage.removeItem("recent");
      }
    }, [isActive]);

    const onSubmit = (e: FormEvent<HTMLFormElement>) => e.preventDefault();

    useEffect(() => {
      const timer = setTimeout(() => {
        if (state.trim().length > 0) {
          setLoading(true);
          searchProfile(state)
            .then(setSearchL)
            .finally(() => setLoading(false));
        }
      }, 200);

      return () => clearTimeout(timer);
    }, [state]);

    useEffect(() => {
      if (state.trim().length == 0) {
        setState("");
      }
    }, [focus]);

    const inputRef = useRef<HTMLInputElement>(null);
    const onFocus = () => setFocus(true);
    const onBlur = () => setFocus(false);
    return (
      <Container className={isActive ? "active" : ""} ref={ref}>
        <div className="title">
          <h1>Search</h1>
        </div>
        <div className="input">
          <form onSubmit={onSubmit}>
            {!focus && state.trim().length == 0 && <SearchIcon2 />}
            <input
              ref={inputRef}
              onChange={(e) => setState(e.target.value)}
              type="text"
              value={state}
              onFocus={onFocus}
              onBlur={onBlur}
              placeholder="Search"
            />
            {(state.length > 0 || focus) && (
              <button
                onClick={() => {
                  setFocus(false);
                  setState("");
                }}
              ></button>
            )}
          </form>
        </div>
        <ul></ul>
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
  &.active {
    left: 0px;
  }
  .title {
    padding: 20px;
    h1 {
      font-size: 24px;
      font-weight: 600;
      line-height: 30px;
    }
  }
  .input {
    display: flex;
    padding: 20px;
    form {
      position: relative;
      width: 100%;
      display: flex;
      border-radius: 8px;
      background-color: #262626;
      align-items: center;
      svg {
        margin-left: 1rem;
      }
      input {
        width: 100%;
        line-height: 18px;
        padding: 3px 1rem;
        font-size: 1rem;
        height: 40px;
        background-color: transparent;
        border: none;
        outline: none;
        padding-right: 40px;
      }
      button {
        background-repeat: no-repeat;
        background-position: -318px -333px;
        height: 20px;
        position: absolute;
        right: 12px;
        top: 50%;
        transform: translateY(-50%);
        z-index: 3;
        width: 20px;
        background-image: url("/bg.png");
      }
    }
  }
`;

export default NotificationsPanel;
