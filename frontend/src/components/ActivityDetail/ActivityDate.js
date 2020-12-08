import { useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'

const ActivityDate = ({ datetime }) => {
  if (!datetime) {
    return (
     <div></div>
    )
  }
  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];

  const formatTime = (date) => {
      let hours = date.getHours()
      let minutes = date.getMinutes()
      const  ampm = hours >= 12 ? 'pm' : 'am'
      hours = hours % 12
      hours = hours ? hours : 12 // the hour '0' should be '12'
      minutes = minutes < 10 ? `0${minutes}` : minutes
      return `${hours}:${minutes} ${ampm}`
    }

  return (
      <div css={css`
        margin-top: 30px;
        text-align: right;

      `}>
        <div css={css`
          font-size: 4rem;
        `}>{datetime.getDate()}</div>
        <div css={css`
          font-size: 2rem;
        `}>
          {monthNames[datetime.getMonth()]}
        </div>
        <div css={css`
          font-size: 2rem;
        `}>{formatTime(datetime)}</div>
      </div>
    )
}

export default ActivityDate
