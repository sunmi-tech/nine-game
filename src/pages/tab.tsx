import { css } from "@emotion/react";
import { useState, useRef, useMemo } from "react";
import cat from "/cat.jpg";

const Tab = () => {
  // 상태 ------------------------------------------------------------------
  const [ready, setReady]   = useState("고양이가 나오면 눌러주세요");
  const [message, setMsg]   = useState("총 3번의 반응 속도를 바탕으로 오늘의 반응 속도를 체크해보세요.");
  const [img, setImg]       = useState("");
  const [btnVisible, setBtn] = useState(true);
  const [times, setTimes]   = useState<number[]>([]);  

  // 시간 측정용 ref
  const startTime = useRef(0);

  // 평균 계산 (값이 바뀔 때만 재계산)
  const average = useMemo(() => {
    if (times.length === 0) return 0;
    const sum = times.reduce((acc, t) => acc + t, 0);
    return Math.round(sum / times.length);
  }, [times]);

  // 게임 시작 --------------------------------------------------------------
  const gameStart = () => {
    setMsg("화면이 변경되자마자 바로 시간이 측정돼요.");
    setReady("화면 중앙을 집중해주세요");

    setTimeout(() => {
      setReady("클릭!");
      setImg(cat);                     // 고양이 등장
      startTime.current = Date.now();  // 시간 시작
    }, Math.floor(Math.random() * 1000) + 2000);

    setBtn(false);
  };

  // 클릭 시 ---------------------------------------------------------------
  const gameClick = () => {
    if (!img) return;  // 고양이 없으면 무시
    const diff = Date.now() - startTime.current; // 걸린 시간(ms)

    setTimes(prev => {
      const next = [...prev, diff];

      // 3번째면 안내 문구 초기화
      if (next.length === 3) {
        setReady("");
        setMsg("");
      } else {
        setReady(`${3 - next.length}번 남았어요!`);
      }
      return next;
    });

    // 다음 라운드 준비
    setImg("");
    setBtn(true);
  };

  // 다시하기 --------------------------------------------------------------
  const reset = () => {
    setTimes([]);
    setReady("고양이가 나오면 눌러주세요");
    setMsg("총 3번의 반응 속도를 바탕으로 오늘의 반응 속도를 체크해보세요.");
    setBtn(true);
  };

  return (
    <div css={tab}>
      <h1>반응속도 체크 게임</h1>

      {btnVisible && times.length < 3 && (
        <button onClick={gameStart}>시작</button>
      )}

      <div css={tabContent}>
        <h2>{ready}</h2>
        <p>{message || (times.length === 3 && "측정 완료!")}</p>
        {/* 이미지 영역 */}
        {img && <img width={600} src={img} onClick={gameClick} />}
      </div>

      {/* 측정 중간 결과 */}
      {times.length > 0 && times.length < 3 && (
        <h2>이번 기록: {times[times.length - 1]}ms</h2>
      )}

      {/* 평균 결과 & 다시하기 버튼 */}
      {times.length === 3 && (
        <>
          <h2>평균 소요시간 : {average}ms</h2>
          <button onClick={reset}>다시하기</button>
        </>
      )}
    </div>
  );
};

// 스타일 --------------------------------------------------------------
const tab = css`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fdfdfd;
  text-align: center;

  button {
    width: 200px;
    height: 60px;
    margin-top: 16px;
    font-size: 1.1rem;
    font-weight: 600;
    cursor: pointer;
    border: none;
    border-radius: 10px;
    background-color: #eeeeee;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: background-color 0.2s, transform 0.2s;

    &:hover {
      background-color: #d6d6d6;
      transform: scale(1.03);
    }
  }

  h1 {
    font-size: 2.5rem;
    margin-bottom: 1rem;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    margin-top: 2rem;
    color: #333;
  }

  p {
    font-size: 1.125rem;
    margin-top: 0.75rem;
    color: #666;
  }
`;

const tabContent = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1.5rem;
  padding: 0 1rem;

  img {
    max-width: 100%;
    width: 600px;
    border-radius: 12px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
    cursor: pointer;
    transition: transform 0.2s;

    &:hover {
      transform: scale(1.02);
    }
  }
`;

export default Tab;
