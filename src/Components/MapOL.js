import { useEffect, useRef, useState } from "react";
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js"
import  View from "ol/View" ;
import DrawMap from "./DrawMap";
import MapContext from "../utils/MapContext";


const MapOL = () => {
    const [map, setMap] = useState({}) ;
    
    const mapElement = useRef() ;

    mapElement.current = map ;

    useEffect(() => {

        const raster = new TileLayer({
            source: new OSM()
        })

        const initMap = new Map({
            layers: [
                 raster
            ],
            view : new View({
                zoom: 2,
                center: [-11000000, 4600000]
            }),
            target : mapElement.current
        })

        setMap(initMap)
    }, [])


    return(
        <MapContext.Provider value = {{map}} >
            <div ref = {mapElement} id="map">
                <DrawMap  />
            </div>
        </MapContext.Provider>
        
    )
}

export default MapOL ;