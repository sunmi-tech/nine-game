import { css } from "@emotion/react";

const Header = () => {
    return (
        <header css={header}>
            <h1><img src="/logo.png" alt="logo" width={48} height={48} />SIX GAMES</h1>
        </header>
    )
}

const header = css `
    background-color: #000;
    color: #fff;

    img {
        vertical-align: middle;
        margin-right: 10px;
    }
`

export default Header;