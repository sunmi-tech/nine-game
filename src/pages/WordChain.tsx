import { css } from "@emotion/react";
import { useState, useRef } from "react";

const WordChain = () => {
    const [word, setWord] = useState("소금");
    const [answer, setAnswer] = useState("");
    const [isCorrect, setIsCorrect] = useState('');
    const inputRef = useRef<HTMLInputElement>(null);

    // 정답 제출
    const handleSubmit = () => {
        if(answer[0] === word[word.length - 1]){
            setIsCorrect('정답')
            setWord(answer)
            setAnswer('')
            inputRef.current?.focus()
        } else {
            setIsCorrect('틀렸습니다.')
            setAnswer('')
            inputRef.current?.focus()
        }
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setAnswer(e.target.value)
    }
    
  return (
    <>
      <div css={wordChain}>
        <h1>끝말잇기 게임</h1>
        <h2>{word}</h2>
        <div css={inputContainer}>
          <input 
          ref={inputRef}
          value={answer}
          onChange={handleInputChange}
          placeholder="단어를 입력하세요"
          type="text" />
          <button onClick={handleSubmit}>제출</button>
        </div>
        <div>
          <p>{isCorrect}</p>
        </div>
      </div>
    </>
  );
};

const wordChain = css`
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
  }

  p {
    margin-top: 1rem;
    font-size: 3rem;
    margin-top: 3rem;
    font-weight: bold;
    color: #ff5722;
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
  }
`;

export default WordChain;
