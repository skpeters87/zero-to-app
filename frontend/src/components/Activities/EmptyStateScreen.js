/** @jsx jsx */
import { css, jsx } from '@emotion/core'


const EmptyStateScreen = () => {
  return (
      <div css={css`
        display: flex;
        align-items: center;
        justify-content: center;
        padding-top: 100px;
        @media (max-width: 600px){
         display: none;
        }
      `}>
        Select an activity
      </div>
  )
}

export default EmptyStateScreen
