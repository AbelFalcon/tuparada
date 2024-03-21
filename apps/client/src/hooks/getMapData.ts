import type { GeolibInputCoordinates } from 'geolib/es/types'
import { useState } from 'react'
import useLocalStorageState from 'use-local-storage-state'

export function getMapData () {
  const [mapData, setMapData] = useLocalStorageState<GeolibInputCoordinates[]>('mapData')
  //const [allCoords, setAllCoords] = useState<GeolibInputCoordinates[]>()
  const [userCoords, setUserCoors] = useLocalStorageState<GeolibInputCoordinates>('userCoords')
  const [openMap, setOpenMap] = useLocalStorageState<Boolean>('openMap', { defaultValue: false })
  const [numClick, setNumClicks] = useLocalStorageState('numClick',{defaultValue:0})


  const addStops = (coords: GeolibInputCoordinates[]) => {
    //console.log(coords)
    setMapData(coords)
  }

  const addUserCoords = (coords: GeolibInputCoordinates) => {
    //console.log(coords)
    setUserCoors(coords)
  }

  const setMapState = (open: Boolean) => {
    //console.log(open)
    setOpenMap(open)
  }

  const addClick = () =>{
    //console.log("click")
    setNumClicks(numClick+1)
  }

  return {
    mapData,
    userCoords,
    openMap,
    numClick,
    setMapState,
    addStops,
    addUserCoords,
    addClick

  }
}
