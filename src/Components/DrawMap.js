import Draw from "ol/interaction/Draw";
import { useContext, useEffect, useState } from "react";
import styles from "../styles";
import MapContext from "../utils/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";

const DrawMap = () => {

    const [value, setValue] = useState("")

    const {map} = useContext(MapContext);

    useEffect(()=>{
        let draw;
        if(Object.keys(map).length !== 0){

            const src = new VectorSource({
                wrapX: false
            })
    
            const vector = new VectorLayer({
                source: src
            })

            map.addLayer(vector)
            const initInteraction = () => {
                if(value !== undefined){
                    draw = new Draw({
                        source: src,
                        type : value,
                        style: styles[value]
                    })
                     console.log(value)
                    map.addInteraction(draw)
                    
                }
                
            }
            initInteraction();
        }
        return () => Object.keys(map).length !== 0 && map.removeInteraction(draw);
    }, [value])
    return(
        <div>
                <button onClick={() => setValue("Point")}>Point</button>
                <button onClick={() => setValue("LineString")}>Line String</button>
                <button onClick={() => setValue("Polygon")}>Polygon</button>
            </div>
    )
}

export default DrawMap;