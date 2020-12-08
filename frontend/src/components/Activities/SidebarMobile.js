/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const ulStyle = css`
grid-area: sidebar-mobile;
border-right: 1px solid black;
height: 100%;
text-align: left;
list-style-type: none;

@media (min-width: 800px){
  display: none;
}
`
const buttonStyle = css`
flex: 0 0 auto;
padding: 12px;
border-radius: 50%;
width: 50px;
margin-top: 3px;
margin-left: 10px;

span {
  display: flex;
  width: 100%;
  height: 4px;
  margin-bottom: 5px;
  position: relative;
  background: gray;
  border-radius: 3px;
  text-align: center;
  z-index: 1;
}
&:hover {
  background-color: rgba(0, 0, 0, 0.08);
  cursor: pointer;

}
`

const SidebarMobile = ({ setShowActivities, showActivities  }) => {

  return (
      <ul css={ulStyle}>
        <div css={buttonStyle} onClick={() => {
          setShowActivities(!showActivities)}}>
          <span></span>
          <span></span>
          <span></span>
        </div>
      </ul>

  )
}

export default SidebarMobile
