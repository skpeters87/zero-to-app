/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ActivityLocation from './ActivityLocation'
import ActivityDate from './ActivityDate'
import EmptyStateScreen from '../Activities/EmptyStateScreen'
import xss from 'xss'
import { navigate } from '@reach/router'

const ActivityDetail = ({ showActivities, currentActivity, reloadActivities, deleteActivity, setCurrentActivity, activities, activityId}) => {
  if (!currentActivity) {
    const activity = activities.filter(item => {
      if (item.key === parseInt(activityId)) return true
      return false
    })[0]
    setCurrentActivity(activity)
    return (
      <EmptyStateScreen />
    )
  }

  const deleteActivityHandler = () => {
      if (!window.confirm('Do you really want to delete?')) {
        return
      }
      deleteActivity(activityId)
      reloadActivities()
      navigate('/activities')
      setCurrentActivity(null)
  }
  return (
      <div className="ActivityDetail" css={css`
        grid-area: main;
        display: ${showActivities ? 'none' : 'block'};
      `}>
        <div css={css`
          max-width: 750px;
          margin: 0 auto;
          padding-right: 20px;
        `}>
        <div css={css`
          display: grid;
          grid-template-columns: auto 110px;
          margin-top: 20px;
          padding-left: 20px;
        `}>
          <div>
              <h1 css={css`
              padding-top: 50px;
              padding-bottom: 40px;
              text-align: left;
            `}>{currentActivity.title}</h1>
              <ActivityLocation lat={currentActivity.lat} lng={currentActivity.lng} />
          </div>
          <ActivityDate datetime={currentActivity.datetime} />
        </div>
        <div css={css`
          padding-left: 20px;
          font-size: 1.5rem;
        `}
        dangerouslySetInnerHTML={{ __html: xss(currentActivity.description) }}></div>
        <div css={css`
          display: flex;
          align-items: center;
          justify-content: center;
        `}>
          <button css={css`
            padding: 20px;
            background-color: #f50707;
            font-size: 0.9rem;
            text-transform: uppercase;
            color: white;
            border-color: transparent;
            border-radius: .5rem;
            margin-top: 50px;
          `}onClick={deleteActivityHandler}>
            Delete Activity
          </button>
        </div>
        </div>
      </div>

  )
}

export default ActivityDetail
