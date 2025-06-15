import { css } from "@emotion/react";
import { useState } from "react";

const GuguDan = () => {
  // 랜덤 구구단 생성
  const [number, setNumber] = useState({
    first: Math.ceil(Math.random() * 9),
    second: Math.ceil(Math.random() * 9),
  });

  // 오답 생성
  const generateWrongAnswers = () => {
    const wrongAnswers: number[] = [];
    while (wrongAnswers.length < 5) {
      const wrongAnswer = Math.ceil(Math.random() * 81);
      if (
        wrongAnswer !== correctAnswer &&
        !wrongAnswers.includes(wrongAnswer)
      ) {
        wrongAnswers.push(wrongAnswer);
      }
    }
    return wrongAnswers;
  };

  // 정답 생성
  const correctAnswer = number.first * number.second;

  // 정답을 포함한 오답 배열 생성
  const wrongAnswers = generateWrongAnswers();
  const allAnswers = [correctAnswer, ...wrongAnswers];
  const shuffledAnswers = allAnswers.sort(() => Math.random() - 0.5);

  // 정답 확인
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState("");

  const handleAnswerClick = (answer: number) => {
    setSelectedAnswer(answer);
    if (answer === correctAnswer) {
      setIsCorrect("정답");
    } else {
      setIsCorrect("오답");
    }

    setTimeout(() => {
      setNumber({
        first: Math.ceil(Math.random() * 9),
        second: Math.ceil(Math.random() * 9),
      });
      setSelectedAnswer(null);
      setIsCorrect("");
    }, 1000);
  };

  return (
    <>
      <div css={gugudan}>
        <h1>구구단 게임</h1>
        <h2>
          {number.first} x {number.second} = <span>?</span>
        </h2>
        <div css={answerButtons}>
          {shuffledAnswers.map((answer, index) => {
            return (
              <button key={index} onClick={() => handleAnswerClick(answer)}>
                {answer}
              </button>
            );
          })}
        </div>
        {selectedAnswer === correctAnswer ? (
          <p>{isCorrect}</p>
        ) : (
          <p>{isCorrect}</p>
        )}
      </div>
    </>
  );
};

const gugudan = css`
  width: 100%;
  height: calc(100vh - 64px);
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

  h2 {
    font-size: 4rem;
    margin-bottom: 1rem;
    color: #444;
    span {
      font-weight: bold;
      color: #ff5722;
    }
  }

  p {
    margin-top: 1rem;
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: bold;
    color: #ff5722;
  }
`;

const answerButtons = css`
  width: 100%;
  max-width: 800px;
  padding: 0 20px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin-top: 1rem;

  button {
    width: 200px;
    height: 80px;
    margin-top: 10px;
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

export default GuguDan;
