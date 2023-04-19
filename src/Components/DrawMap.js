import {Draw, Modify, Select} from "ol/interaction";
import { useContext, useEffect, useRef, useState } from "react";
import styles from "../styles";
import MapContext from "../utils/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";



const DrawMap = ({mapElement}) => {

    const [value, setValue] = useState("") ;
    const [vec, setVec] = useState({}) ;
    const [draw, setDraw] = useState();
    const [select, setSelect] = useState({});
    const[src, setSrc] = useState();

    

    const {map} = useContext(MapContext);

    useEffect(() => {
        function handleEvent(e) {
            e.preventDefault()
            // console.log("div", select);
            if(e.key === 'Delete') {
                deleteSelectedInteraction();
            }
        }
        const div = document.body;
        div.addEventListener('keydown', handleEvent)
    }, [draw])

    useEffect(()=>{
        
        if(Object.keys(map).length !== 0){

            const src = new VectorSource({
                wrapX: false
            })

            setSrc(src);
    
            const vector = new VectorLayer({
                source: src
            })

            setVec(vector);

            map.addLayer(vector);

            const initInteraction = () => {
                if(value !== undefined){
                    const drawTmp = new Draw({
                        source: src,
                        type : value,
                        style: styles[value]
                    })
                    setDraw(drawTmp);
                    console.log(value)
                    map.addInteraction(drawTmp)
                    
                }
                
            }
            initInteraction();
        }
        
        

        return () => {
            Object.keys(map).length !== 0 && map.removeInteraction(draw);
            // div.removeEventListener('keydown')
        }
    }, [value])

    const handleSelect = () => {
        const selectTmp = new Select();
        
        map.addInteraction(selectTmp);
        const modify = new Modify({
            features: selectTmp.getFeatures(),
        }) ;
        map.addInteraction(modify);
        const selectedFeatures = selectTmp.getFeatures();
        selectTmp.setActive(true);
        
        console.log("feature", selectedFeatures);
        modify.setActive(true);
        // Draw.setActive(false);
        draw.setActive(false);
        map.removeInteraction(draw)
        setSelect(selectTmp);
    }

    const deleteSelectedInteraction = () => {
        // console.log(select);
        var selectedFeature = select.getFeatures().item(0);
        vec.getSource().removeFeature(selectedFeature)
    }

    


    return(
        <div >
                <button onClick={() => setValue("Point")}>Point</button>
                <button onClick={() => setValue("LineString")}>Line String</button>
                <button onClick={() => setValue("Polygon")}>Polygon</button>
                <button onClick={() => handleSelect()}>Select</button>
                <button onClick={() => deleteSelectedInteraction()}>Delete</button>
            </div>
    )
}

export default DrawMap;