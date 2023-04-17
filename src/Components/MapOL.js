import { useEffect, useRef, useState } from "react";
import Map from "ol/Map"
import TileLayer from "ol/layer/Tile.js";
import OSM from "ol/source/OSM.js"
import  View from "ol/View" ;
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Draw from "ol/interaction/Draw";

const MapOL = () => {
    const [map, setMap] = useState({}) ;
    const [src, setSrc] = useState();
    const [value, setValue] = useState("")
    const mapElement = useRef() ;

    mapElement.current = map ;

    useEffect(() => {

        const raster = new TileLayer({
            source: new OSM()
        })

        const src = new VectorSource({
            wrapX: false
        })

        setSrc(src);

        const vector = new VectorLayer({
            source: src
        })

        const initMap = new Map({
            layers: [
                vector, raster
            ],
            view : new View({
                zoom: 4,
                center: [-11000000, 4600000]
            }),
            target : mapElement.current
        })

        setMap(initMap)
    }, [])

    useEffect(()=>{
        if(Object.keys(map).length !== 0){
            let draw;

            const initInteraction = () => {
                console.log(map)
                if(value !== undefined){
                    draw = new Draw({
                        source: src,
                        type : value
                    })
                    // console.log(draw)
                    let nap = map ;
                    nap.addInteraction(draw) ;
                    setMap(nap);
                }
                
            }

            initInteraction();
        }
        
    }, [value])


    return(
        <div ref = {mapElement} className="map-ol">
            <div>
                <button onClick={() => setValue("Point")}>Point</button>
                <button onClick={() => setValue("LineString")}>Line String</button>
                <button onClick={() => setValue("Polygon")}>Polygon</button>
            </div>
        </div>
    )
}

export default MapOL ;