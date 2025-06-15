import { css } from "@emotion/react";
import { Link } from "react-router-dom";
import rspImage from "../assets/images/rsp.png";
import baseballImage from "../assets/images/baseball.png";
import gugudanImage from "../assets/images/gugudan.png";
import tabImage from "../assets/images/tab.png";
import lottoImage from "../assets/images/lotto.png";

const games = [
  {
    title: "가위 바위 보",
    image: rspImage,
    link: "/rsp",
  },
  {
    title: "숫자 야구",
    image: baseballImage,
    link: "/baseball",
  },
  {
    title: "구구단",
    image: gugudanImage,
    link: "/gugudan",
  },
  {
    title: "반응 속도체크",
    image: tabImage,
    link: "/tab",
  },
  {
    title: "로또 번호 추첨",
    image: lottoImage,
    link: "/lotto",
  },
];

const Home = () => {
  return (
    <>
      <ul css={home}>
        {games.map((game, index) => (
          <li key={index}>
            <Link to={game.link}>
              <img src={game.image} alt={game.title} />
              <h1>{game.title}</h1>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
};

const home = css`
  height: calc(100vh - 80px);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  gap: 40px;
  overflow: hidden;

  li {
    width: 280px;
    height: 320px;
    background-color: #fff;
    border-radius: 20px;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);
    transition: all 0.2s ease;
    overflow: hidden;
    cursor: pointer;

    &:hover {
      transform: translateY(-8px);
      box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1),
        0 10px 10px -5px rgba(0, 0, 0, 0.04);
    }

    a {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
      text-decoration: none;
    }
  }

  img {
    width: 100%;
    height: 75%;
    object-fit: cover;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  }

  h1 {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 20px;
    font-weight: 600;
    color: #2d3748;
    padding: 15px;
    text-align: center;
    margin: 0;
  }
`;

export default Home;
