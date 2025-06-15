import { css } from "@emotion/react";
import { useState, useRef, useEffect } from "react";

const Baseball = () => {
  const [input, setInput] = useState("");
  const [answer, setAnswer] = useState<number[]>([]);
  const [tryCount, setTryCount] = useState(0);
  const [result, setResult] = useState<string[]>([]);
  const [gameOver, setGameOver] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  // 랜덤 숫자 생성 (중복 없는 3자리)
  const generateRandomNumber = () => {
    const numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const randomNumbers: number[] = [];
    while (randomNumbers.length < 3) {
        // Math.random() = 0 ~ 1 사이의 랜덤 숫자를 뽑고, Math.floor() 로 소숫점을 버림
        // randomNumber에 numbers의 index를 랜덤으로 뽑아서 넣어줌
      const randomIndex = Math.floor(Math.random() * numbers.length);
      const randomNumber = numbers[randomIndex];
      if (!randomNumbers.includes(randomNumber)) {
        randomNumbers.push(randomNumber);
      }
    }
    return randomNumbers;
  };

  // 게임 시작 시 정답 생성
  useEffect(() => {
    setAnswer(generateRandomNumber());
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = () => {
    if (gameOver) return;

    if (
      input.length !== 3 ||
    // set은 중복값이 없는 배열이라서 중복값이 있으면 3이 아니게 됨
      new Set(input).size !== 3 ||
      
      isNaN(Number(input))
    ) {
      alert("중복 없는 숫자 3자리를 입력해주세요.");
      return;
    }

    const resultText = checkResult(input);
    setResult((prev) => [...prev, resultText]);

    const isCorrect = resultText.includes("3스트라이크");
    const newTryCount = tryCount + 1;

    if (isCorrect) {
      alert("🎉 정답입니다!");
      setGameOver(true);
    } else if (newTryCount >= 10) {
      alert(`💥 게임 오버! 정답은 ${answer.join("")}입니다`);
      setGameOver(true);
    }

    setTryCount(newTryCount);
    setInput("");
    inputRef.current?.focus();
  };

  const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  const checkResult = (input: string) => {
    const inputArr = input.split("").map(Number);
    let strike = 0;
    let ball = 0;

    inputArr.forEach((num, idx) => {
      if (num === answer[idx]) {
        strike++;
      } else if (answer.includes(num)) {
        ball++;
      }
    });

    return `${input} ➜ ${strike}스트라이크 ${ball}볼`;
  };

  const handleReset = () => {
    setAnswer(generateRandomNumber());
    setTryCount(0);
    setResult([]);
    setInput("");
    setGameOver(false);
    inputRef.current?.focus();
  };

  return (
    <div css={baseball}>
      <h1>숫자 야구게임</h1>
      <div css={inputContainer}>
        <input
          ref={inputRef}
          value={input}
          onChange={handleInputChange}
          onKeyUp={handleKeyUp}
          maxLength={3}
          type="text"
          placeholder="숫자 3자리를 입력해주세요. ex) 123"
          disabled={gameOver}
        />
        <button onClick={handleSubmit} disabled={gameOver}>입력</button>
      </div>
      <div css={resultContainer}>
        <h2>{tryCount}번 시도</h2>
        <ul>
          {result.map((item, index) => (
            <li key={index}>
              <p>{item.split("➜")[0]}</p>
              <p>{item.split("➜")[1]}</p>
            </li>
          ))}
        </ul>
      </div>
      {gameOver && (
        <button onClick={handleReset} css={resetButton}>
          🔄 다시 시작하기
        </button>
      )}
    </div>
  );
};

const baseball = css`
  width: 100%;
  min-height: calc(100vh - 64px);
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  background: #fdfdfd;

  h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
    color: #333;
  }
`;

const inputContainer = css`
  display: flex;
  gap: 10px;
  width: 100%;
  max-width: 600px;

  input {
    flex: 1;
    padding: 12px 16px;
    font-size: 1.2rem;
    border: 2px solid #ccc;
    border-radius: 8px;
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: #3498db;
    }

    &:disabled {
      background: #eee;
      color: #aaa;
    }
  }

  button {
    padding: 12px 24px;
    font-size: 1.1rem;
    font-weight: bold;
    background-color: #3498db;
    color: white;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.2s;

    &:hover {
      background-color: #2980b9;
    }

    &:disabled {
      background-color: #ccc;
      cursor: not-allowed;
    }
  }
`;

const resultContainer = css`
  width: 100%;
  max-width: 600px;
  margin-top: 2rem;
  padding: 1.5rem;
  border: 1px solid #ddd;
  border-radius: 12px;
  background-color: #fafafa;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);

  h2 {
    font-size: 1.2rem;
    margin-bottom: 1rem;
    color: #555;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 16px;
    margin-bottom: 8px;
    background-color: #fff;
    border: 1px solid #eee;
    border-radius: 8px;
    box-shadow: 0 1px 4px rgba(0, 0, 0, 0.02);
    transition: transform 0.1s ease-in-out;

    &:hover {
      transform: scale(1.01);
    }

    p {
      margin: 0;
      font-size: 1.1rem;

      &:first-of-type {
        font-weight: bold;
        color: #333;
      }

      &:last-of-type {
        color: #888;
      }
    }
  }
`;

const resetButton = css`
  margin-top: 1.5rem;
  padding: 12px 20px;
  font-size: 1.1rem;
  font-weight: bold;
  background-color: #e74c3c;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
  margin-bottom: 100px;

  &:hover {
    background-color: #c0392b;
  }
`;

export default Baseball;
