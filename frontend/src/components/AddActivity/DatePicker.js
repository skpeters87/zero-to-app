import { useState } from 'react'
/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider, DateTimePicker } from '@material-ui/pickers';

const DatePicker = ({ datetime, setDatetime}) => {
  const setNewDatetime = newDatetime => {
    setDatetime(newDatetime.toDate())
  }
  return (
      <div css={css`
        margin-top: 40px;
        padding-top: 30px;
        padding-bottom: 30px;
      `}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <DateTimePicker value={datetime} onChange={setNewDatetime} />
        </MuiPickersUtilsProvider>
      </div>
    )
}

export default DatePicker
