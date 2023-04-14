import { useEffect, useRef, useState } from "react";
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js"
import  View from "ol/View" ;

const MapOL = () => {
    const [map, setMap] = useState({}) ;
    const mapElement = useRef() ;

    mapElement.current = map ;

    useEffect(() => {
        const initMap = new Map({
            layers: [
                new TileLayer({
                    source: new OSM()  
                })
            ],
            view : new View({
                zoom: 2,
                center: [0,0]
            }),
            target : mapElement.current
        })

        setMap(initMap)
    }, [])

    return(
        <div ref = {mapElement} className="map-ol"></div>
    )
}

export default MapOL ;