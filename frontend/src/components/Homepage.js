/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import logo from '../img/logo.svg'
import screenshot from '../img/screenshot.svg'
import { navigate } from '@reach/router'

const Homepage = () => {
  const addActivity = () => {
    navigate('/start')
  }

  return (
    <header className="Homepage" css={css`
      background-color: #fff;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      font-size: calc(10px + 2vmin);
      color: #000;
    `}>
        <img src={logo} alt="logo" css={css`
          height: 40vmin;
        `} />
        <div css={css`
          display: grid;
          grid-template-columns: 50% 50%;
        `}>
          <div>
              <img src={screenshot} className="screenshot" alt="screenshot" css={css`
                width: 100%;
                max-width: 300px;
              `}/>
          </div>
          <div>
            <p css={css`
               display: grid;
               max-width: 200px;
               text-align: left;
               padding-left: 50px;
            `}>Log your daily activities into the application it’s alot of fun and easy to get started!</p>
            <button onClick={addActivity} css={css`
              margin-left: 50px;
              margin-top: 30px;
              padding: 20px;
              background-color: #49BA37;
              font-size: 3rem;
              text-transform: uppercase;
              color: #fff;
              border-color: transparent;
              &:hover{
                cursor: pointer;
              }
            `}>Start</button>
          </div>
        </div>
      </header>
  )
}

export default Homepage
