/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { navigate } from '@reach/router'
import { gql } from 'apollo-boost'
import { Query } from 'react-apollo'

const ActivitiesList = ({ showActivities, setShowActivities, activities, setCurrentActivity, loggedIn }) => {

  const monthNames = [
    'JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN',
    'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC']

  return (
      <div css={css`
      grid-area: sidebar-desktop;
      border-right: 1px solid black;
      height: 100%;
      text-align: left;
      list-style-type: none;

      @media (max-width: 800px){
        display: ${showActivities ? 'block' : 'none'};
      }

      display: grid;
      grid-template-rows: auto 80px;

      `}>
        <Query query={gql`
          {
            activities {
              title
            }
          }
        `}>
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>
            if (error) {
              console.log(error)
              // navigate('/')
              return <p></p>
            }
          console.log(data)
          if (!data || !data.activities) return ''
          return <ul>{data.activities.map(item => <li key={item.title}>{item.title}</li>)}</ul>
          }}
        </Query>
      <ul className="List" css={css`
        list-style-type: none;
      `}>
        {activities.map((activity, index) => {
          return <li key={index} css={css`
            display: grid;
            grid-template-columns: 50px auto;
            padding: 20px;
            border-bottom: 1px solid black;
            &:hover {
              background-color: lightgray;
              cursor: pointer;
            }
          `} onClick={() => {
            navigate(`/activities/${activity.key}`)
            setCurrentActivity(activity)
            setShowActivities(false)
          }}>
          <div css={css`
        margin-top: 30px;

      `}>
        <div css={css`
          font-size: 2rem;
        `}>{activity.datetime && activity.datetime.getDate()}</div>
        <div css={css`
          font-size: 1rem;
        `}>
          {activity.datetime && monthNames[activity.datetime.getMonth()]}
        </div>
      </div>
      <div css={css`
        font-size: 1.5rem;
      `}>{activity.title}</div>
      </li>
        })}
      </ul>
      <div css={css`
        text-align: center;
        border-top: 1px solid black;
        padding-top: 20px;
      `}>
        <button css={css`
          font-size: 2rem;
          padding-left: 30px;
          padding-right: 30px;
          outline: none;
        `}onClick={() => {
          if (!loggedIn) {
            navigate('/register')
            return
          }
          navigate('/add-activity');
        }}>+</button>
      </div>
      </div>

  )
}

export default ActivitiesList
