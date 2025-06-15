import { css } from "@emotion/react";
import Ball from "../components/Ball";
import { useState, useEffect, useMemo } from "react";

const getLotto = () => {
  const lottoNum: number[] = [];
  for (let i = 0; i < 7; i++) {
    const num = Math.floor(Math.random() * 45) + 1;
    if (lottoNum.includes(num)) {
      i--;
      continue;
    }
    lottoNum.push(num);
  }
  return lottoNum;
};

const Lotto = () => {
  const lottoNum = useMemo(() => getLotto(), []);
  const [numbers, setNumbers] = useState<number[]>(lottoNum);
  const [lotto, setLotto] = useState<number[]>([]);
  const [bonus, setBonus] = useState<number | null>(null);
  const [redo, setRedo] = useState(false);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    for (let i = 0; i < numbers.length; i++) {
      const timer = setTimeout(() => {
        setLotto((prev) => [...prev, numbers[i]]);
      }, (i + 1) * 1000);
      timers.push(timer);
    }

    const bonusTimer = setTimeout(() => {
      setBonus(numbers[6]);
      setRedo(true);
    }, 7000);
    timers.push(bonusTimer);

    return () => {
      timers.forEach((timer) => clearTimeout(timer));
    };
  }, [numbers]);

  const redoLotto = () => {
    setNumbers(getLotto());
    setLotto([]);
    setBonus(null);
    setRedo(false);
  };

  return (
    <>
      <div css={lottoStyle}>
        <h1>로또번호 뽑기</h1>
        <div css={ballContainerStyle}>
          {lotto.slice(0, 6).map((num, idx) => (
            <Ball key={idx} num={num} />
          ))}
        </div>
        {bonus !== null && (
          <>
            <h2>보너스</h2>
            <Ball num={bonus} />
          </>
        )}
        {redo && <button onClick={redoLotto}>다시뽑기</button>}
      </div>
    </>
  );
};

const lottoStyle = css`
  width: 100%;
  height: calc(100vh - 64px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #fdfdfd;
  text-align: center;

  h1 {
    font-size: 2.5rem;
    margin-bottom: 3rem;
    color: #333;
  }

  h2 {
    font-size: 1.5rem;
    margin-bottom: 1rem;
    color: rgb(106, 141, 255);
  }

  button {
    width: 200px;
    height: 80px;
    margin-top: 30px;
    font-size: 1.25rem;
    font-weight: bold;
    cursor: pointer;
    border: none;
    border-radius: 12px;
    background-color: #eeeeee;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
    transition: all 0.2s;
    &:hover {
      background-color: #d6d6d6;
      transform: scale(1.05);
    }
  }
`;

const ballContainerStyle = css`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`;

export default Lotto;
