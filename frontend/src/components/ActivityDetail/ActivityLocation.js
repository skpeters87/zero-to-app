/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect } from 'react'
import L from 'leaflet'
import '../../leaflet/leaflet.css'


let mapInstance = null

const initializeMap = (lat, lng) => {
  if (!lat || !lng) return

  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib})
  mapInstance = L.map('mapid', {
    closePopupOnClick: false,
    boxZoom: false,
    doubleClickZoom: false,
    dragging: false,
    zoomControl: false,
    scrollWheelZoom: false
  }).setView([lat || 51.505, lng || -0.09], 13).addLayer(osm)

  const markerIcon = L.icon({
    iconUrl: '/img/marker-icon.png',
    iconSize: [38, 65],
    iconAnchor: [22, 64],
    popupAnchor: [-3, -76]
  })

  L.marker([lat || 51.505, lng || -0.09], {icon: markerIcon})
    .addTo(mapInstance)
}

const ActivityLocation = ({ lat, lng }) => {
  useEffect(() => {
    initializeMap(lat, lng)

    return () => {
      if (!mapInstance) return
      mapInstance.off()
      mapInstance.remove()
      mapInstance = null
    }
  }, [lat, lng])

  if (!lat || !lng) {
    mapInstance = null
    return (
     <div></div>
    )
  }

  return (
    <div className="ActivityLocation" css={css`
      padding-top: 30px;
      padding-bottom: 30px;
    `}>
      <div id="mapid" css={css`
        margin: 0 auto;
        width: 100%;
        height: 200px;`
  }></div>
    </div>
  )
}

export default ActivityLocation
