/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useState } from 'react'
import MapPicker from './MapPicker'
import DatePicker from './DatePicker'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import xss from 'xss'
import { navigate } from '@reach/router'


const AddActivity = ({ comingFromHomepage, storeActivity, reloadActivities }) => {
  const [ title, setTitle ] = useState('')
  const [lat, setLat] = useState('')
  const [lng, setLng] = useState('')
  const [ description, setDescription] = useState('')
  const [datetime, setDatetime] = useState(new Date())

  const addActivity = () => {
    if (!title) {
      alert('need title')
      return
    }
    const santizedTitle = xss(title)
    const santizedDescription = xss(description)

    storeActivity({title: santizedTitle, lat, lng, description: santizedDescription, datetime})
    reloadActivities()
    navigate('/activities')
  }

  return (
    <div className="AddActivity" css={css`
      display: grid;
      grid-template-rows: 80px 300px 500px;
      max-width: 1000px;
      margin: 0 auto;

      @media (max-width: 800px){
        grid-template-rows: 80px 600px 500px;
      }
    `}>
      <div>
        {comingFromHomepage ? '' :
          <button css={css`
              padding: 20px;
              background-color: #6e797a;
              font-size: 2rem;
              text-transform: uppercase;
              color: #black;
              border-color: transparent;
              border-radius: .5rem;
              float: left;
              margin-top: 40px;
            `}onClick={() => navigate('/activities')}>
              Back
          </button>
        }
        <button css={css`
          padding: 20px;
          background-color: #49BA37;
          font-size: 2rem;
          text-transform: uppercase;
          color: #fff;
          border-color: transparent;
          border-radius: .5rem;
          float: right;
          margin-top: 40px;
        `}onClick={addActivity}>
          Save Activity
        </button>
      </div>
      <div css={css`
        display: grid;
        grid-template-columns: 50% 50%;
        padding-top: 50px;

        @media (max-width: 800px){
          grid-template-columns: 100%;
        }
      `}>
        <div>
          <input css={css`
            padding: 20px;
            width: 400px;
            font-size: 2rem;
          `} onChange={ event => setTitle(event.target.value)} placeholder="Enter the activity name" required/>
          <DatePicker datetime={datetime} setDatetime={setDatetime}/>
        </div>
        <MapPicker lat={lat} lng={lng} setlat={setLat} setLng={setLng}/>
      </div>
      <div>
        <h2 css={css`
          margin-bottom: 0.5rem;
        `}>Activity Description</h2>
        <ReactQuill value={description} onChange={value => setDescription(value)} />
      </div>
    </div>
  )
}

export default AddActivity
