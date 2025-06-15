import { css } from "@emotion/react";


const Ball = ({ num }: { num: number }) => {
  return <div css={getBallStyle(num)}>{num}</div>;
};

const getBallStyle = (n: number) => {
    let background = "";
    let color = "";
  
    if (n <= 10) {
      background = "#fbc400"; // 노랑
      color = "#a68900";         
    } else if (n <= 20) {
      background = "#69c8f2"; // 파랑
      color = "#2576a2";
    } else if (n <= 30) {
      background = "#ff5b5b"; // 빨강
      color = "#a22a2a";
    } else if (n <= 40) {
      background = "#888888"; // 회색
      color = "#2e2e2e";
    } else {
      background = "#51c75b"; // 초록
      color = "#1d5f2e";
    }
  
    return css`
      width: 60px;
      height: 60px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 4px;
      font-size: 1.4rem;
      font-weight: 700;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.25);
      background-color: ${background};
      color: ${color};
    `;
  };

export default Ball;
