import {Draw, Modify, Select} from "ol/interaction";
import { useContext, useEffect, useState } from "react";
import styles from "../styles";
import MapContext from "../utils/MapContext";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";



const DrawMap = () => {

    const [value, setValue] = useState("") ;
    const [vec, setVec] = useState({}) ;
    const [draw, setDraw] = useState();
    const [select, setSelect] = useState({});

    

    const {map} = useContext(MapContext);

    useEffect(() => {
        const deleteHandler = (event) => {
          if (event.stopPropagation) event.stopPropagation();
          const KeyID = event.keyCode;
          console.log(KeyID);
          if (KeyID === 46) {
            deleteSelectedInteraction();
          }
        };
        document.addEventListener("keydown", deleteHandler);
        return () => document.removeEventListener("keydown", deleteHandler);
      }, [select]);

    useEffect(()=>{
        let drawTmp;
        if(Object.keys(map).length !== 0){

            const src = new VectorSource({
                wrapX: false
            })
    
            const vector = new VectorLayer({
                source: src
            })

            setVec(vector);

            map.addLayer(vector);

            const initInteraction = () => {
                if(value !== undefined ){
                    drawTmp = new Draw({
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
            Object.keys(map).length !== 0 && map.removeInteraction(drawTmp);
            // setDraw(null);
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
        // const selectedFeatures = selectTmp.getFeatures();
        selectTmp.setActive(true);
        
        modify.setActive(true);
        draw.setActive(false);
        map.removeInteraction(draw)
        setSelect(selectTmp);
    }

    const deleteSelectedInteraction = () => {
        var selectedFeature = select.getFeatures();
        let vecTmp = vec ;
        selectedFeature.forEach(it => {
            vecTmp.getSource().removeFeature(it)    
        })
        setVec(vecTmp);
    }

    


    return(
        <div>
                <button onClick={() => setValue("Point")}>Point</button>
                <button onClick={() => setValue("LineString")}>Line String</button>
                <button onClick={() => setValue("Polygon")}>Polygon</button>
                <button onClick={() => handleSelect()}>Select</button>
                <button onClick={() => deleteSelectedInteraction()}>Delete</button>
            </div>
    )
}

export default DrawMap;