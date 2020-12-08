// import React from 'react'
import { useState } from 'react'
import { Router } from '@reach/router'

/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import ActivityDetail from './ActivityDetail/ActivityDetail'
import SidebarMobile from './Activities/SidebarMobile'
import ActivitiesList from './Activities/ActivitiesList'
import EmptyStateScreen from './Activities/EmptyStateScreen'

const Activities = ({ activities, deleteActivity, reloadActivities, loggedIn}) => {
  const [showActivities, setShowActivities] = useState(false)

  const [currentActivity, setCurrentActivity] = useState(null)

  return (
    <div className="Activities" css={css`
      grid-template-areas: "sidebar-desktop main";
      display: grid;
      grid-template-columns: 300px auto;
      width: 100vw;
      height: 100vh;

      @media (max-width: 800px){
        grid-template-columns: 80px auto;
        grid-template-areas: "sidebar-mobile ${showActivities ? 'sidebar-desktop' : 'main'}";
      }

    `}>
      <ActivitiesList showActivities={showActivities} setShowActivities={setShowActivities} activities={activities} setCurrentActivity={setCurrentActivity} />
      <SidebarMobile showActivities={showActivities} setShowActivities={setShowActivities}
      loggedIn={loggedIn} />
      <Router>
        <ActivityDetail
        showActivities={showActivities}
        currentActivity={currentActivity}
        reloadActivities={reloadActivities}
        deleteActivity={deleteActivity}
        setCurrentActivity={setCurrentActivity}
        activities={activities}
        path=":acvitivityId"/>
        <EmptyStateScreen path="/" />
      </Router>
    </div>

  )
}

export default Activities
