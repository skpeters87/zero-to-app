/** @jsx jsx */
import { css, jsx } from '@emotion/core'
import { useEffect } from 'react'
import L from 'leaflet'
import '../../leaflet/leaflet.css'


let mapInstance = null

const initializeMap = (lat, lng, setLat, setLng) => {
  const osmUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  osmAttrib = '&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  osm = L.tileLayer(osmUrl, {maxZoom: 18, attribution: osmAttrib})

  mapInstance = L.map('mapid')

  window.navigator.geolocation.getCurrentPosition(position => {
    if (!mapInstance) {
      return
    }

    const latlng = [lat || position.coords.latitude,
    lng || position.coords.longitude]

    mapInstance = mapInstance.setView(latlng, 13).addLayer(osm)

    const markerIcon = L.icon({
      iconUrl: '/img/marker-icon.png',
      iconSize: [38, 65],
      iconAnchor: [22, 64],
      popupAnchor: [-3, -76]
    })

    L.marker(latlng, {icon: markerIcon})
    .addTo(mapInstance)
    .bindPopup('Activity location')
    .openPopup()

    mapInstance.on('click', e => {
      setLat(e.latlng.lat)
      setLng(e.latlng.lng)

      const popup = L.popup()
      popup
        .setLatLng(e.latlng)
        .setContent("Activity Location " + e.latlng.toString())
        .openOn(mapInstance);
    })
  }, error => {
    console.error(error)
  }, {

  })
}

const MapPicker = ({lat, lng, setLat, setLng }) => {
  useEffect(() => {
    initializeMap(lat, lng, setLat, setLng)

    return () => {
      if (!mapInstance) return
      mapInstance.off()
      mapInstance.remove()
      mapInstance = null
    }
  }, [lat, lng, setLat, setLng])

  return (
    <div className="MapPicker" css={css`
      padding-top: 30px;
      padding-bottom: 30px;
    `}>
      <div id="mapid" css={css`
        margin: 0 auto;
        width: 100%;
        height: 170px;`
      }>
      </div>
    </div>
  )
}

export default MapPicker
