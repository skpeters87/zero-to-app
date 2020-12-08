import React, { useState, useEffect } from 'react'
import { Router } from '@reach/router'
import { openDB } from 'idb'
import Cookies from 'js-cookie'
import logo from './img/logo.svg'
import './App.css'

import Homepage from './components/Homepage'
import AddActivity from './components/AddActivity/AddActivity'
import Activities from './components/Activities'
import Login from './components/Login'
import Register from './components/Register'

import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { ApolloProvider } from 'react-apollo'
import { setContext } from 'apollo-link-context'
import { gql } from 'apollo-boost'

const httpLink = createHttpLink({
  uri: 'http://localhost:3001/graphql',
  credentials: 'include'
})

const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
})


const storeName = 'activities'

const initDatabase = async () => {
  const dbName = 'appwork'
  const version = 1

  const db = await openDB(dbName, version, {
    upgrade(db, oldVersion, newVersion, transaction){
      db.createObjectStore(storeName, {
        autoIncrement: true
      })
    }
  })
  return db
}

const initActivities = async () => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readonly')
  const activities = tx.objectStore(storeName).getAll()
  await tx.done

  // sort activities


  return activities
}

const initKeys = async () => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readonly')
  const keys = tx.objectStore(storeName).getAllKeys()
  await tx.done

  return keys
}

const getActivities = async() => {
  let activities = await initActivities()
  let keys = await initKeys()

  activities.forEach((activity, index) => {
    activity.key = keys[index]
  })

  activities = activities.sort((a,b) => {
    return new Date(b.datetime) - new Date(a.datetime)
  })

  return activities
}

const storeActivity = async (activity) => {
  const ADD_ACTIVITY_MUTATION = gql`
    mutation AddActivity(
      $title: String!
      $description: String!
      $datetime: String!
      $lat: String!
      $lng: String!
    ) {
      addActivity(
        title: $title
        description: $description
        datetime: $datetime
        lat: $lat
        lng: $lng
      ) {
        id
        title
      }
    }
  `
  client.mutate({
    mutation: ADD_ACTIVITY_MUTATION,
    variables: {
      title: activity.title,
      description: activity.description,
      datetime: activity.datetime,
      lat: String(activity.lat),
      lng: String(activity.lng)
    }
  }).then( data => {
    console.log(data)
  })

  return
  // const db = await initDatabase()

  // const tx = await db.transaction(storeName, 'readwrite')
  // const store = await tx.objectStore(storeName)

  // await store.put(activity)
  // await tx.done
}

const deleteActivity = async (key) => {
  const db = await initDatabase()
  const tx = await db.transaction(storeName, 'readwrite')
  const store = await tx.objectStore(storeName)

  await store.delete(key)
  await tx.done
}

const App = () => {
  const [activities, setActivities] = useState([])
  const [loggedIn, setLoggedIn] = useState(!!Cookies.get('signed_in'))

  const reloadActivities = async () => {
    const activities = await getActivities()
    setActivities(activities)
  }

  useEffect(() => {
    (async () => {
      reloadActivities()
    })();
  }, [])

  return (
    <div className="App">
      <ApolloProvider client={client}>
        <Router>
          <Homepage path="/" />
          <AddActivity
          comingFromHomepage
          storeActivity={storeActivity}
          reloadActivities={reloadActivities}
          path="/start" />
          <Register path="/register" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <Login path="/login" loggedIn={loggedIn} setLoggedIn={setLoggedIn}/>
          <AddActivity
          storeActivity={storeActivity}
          reloadActivities={reloadActivities}
          path="/add-activity"/>
          <Activities
          activities={activities}
          reloadActivities={reloadActivities}
          deleteActivity={deleteActivity}
          loggedIn={loggedIn}
          path="/activities/*" />
        </Router>
      </ApolloProvider>
    </div>
  )
}

export default App
