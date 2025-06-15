import { css } from "@emotion/react";
import { useState, useEffect, useRef } from "react";

const FRAME = 200;

const Rsp = () => {
  const [result, setResult] = useState("");
  const [pos, setPos] = useState(0); // 0 : 가위, 1: 바위, 2: 보
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setPos((prev) => (prev + 1) % 3);
    }, 100);
    return () => clearInterval(intervalRef.current!);
  }, []);

  const onClickButton = (choice: number) => {
    clearInterval(intervalRef.current!);

    const diff = (choice - pos + 3) % 3;
    if (diff === 0) setResult("비겼습니다");
    else if (diff === 1) setResult("이겼습니다");
    else setResult("졌습니다");

    setTimeout(() => {
      intervalRef.current = setInterval(() => {
        setPos((prev) => (prev + 1) % 3);
      }, 100);
    }, 1000);
  };

  return (
    <>
      <div css={rsp}>
        <h1>가위바위보 게임</h1>
        <div css={spriteFrame}>
          <img css={spriteImage(pos)} src="/gsp.png" alt="가위바위보 이미지" />
        </div>
        <div>
          <button onClick={() => onClickButton(0)}>가위</button>
          <button onClick={() => onClickButton(1)}>바위</button>
          <button onClick={() => onClickButton(2)}>보</button>
        </div>
        <div>
          <p>{result}</p>
        </div>
      </div>
    </>
  );
};

const rsp = css`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fdfdfd;
  text-align: center;
  position: relative;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
  }


  button {
    padding: 0.9rem 2.2rem;
    font-size: 1.2rem;
    font-weight: 600;
    border: none;
    border-radius: 12px;
    background-color: #1a3129;
    color: #ffffff;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.15s ease;
    margin-right: 1rem;

    &:hover {
      background-color: #244139;
      transform: translateY(-3px);
    }

    &:active {
      background-color: #12201c;
      transform: translateY(0);
    }
  }

  p {
    font-size: 2rem;
    font-weight: 700;
    margin-top: 2rem;
  }
`;

const spriteFrame = css`
  width: ${FRAME}px;
  height: ${FRAME}px;
  overflow: hidden; /* 넘어가는 부분 잘라냄 */
  margin-bottom: 2rem;
`;

/* 안쪽 이미지: X축으로 밀어서 원하는 칸만 보이게 */
const spriteImage = (pos: number) => css`
  height: ${FRAME}px; /* 세로 맞추기 */
  transform: translateX(-${FRAME * pos}px);
`;

export default Rsp;
