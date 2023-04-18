import {Circle, Fill, Stroke, Style} from 'ol/style.js';

 const styles = {
    "Point": new Style({
        image: new Circle({
  radius: 5,
  stroke: new Stroke({ color: 'rgba(255, 0, 0, 1)' }),
  fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' })
        })
}),
    "LineString": new Style({
        stroke: new Stroke({
          color: 'rgba(255, 102, 0, 1)',
          width: 3
        }),
        image: new Circle({
            radius: 5,
            stroke: new Stroke({ color: 'rgba(255, 0, 0, 1)' }),
            fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' })
                  })
      }),

    "Polygon": new Style({
        stroke: new Stroke({
          color: 'rgba(255, 102, 0, 1)',
          width: 3
        }),
        fill: new Fill({
          color: 'rgba(255, 102, 0, 0.3)'
        }),
        image: new Circle({
            radius: 5,
            stroke: new Stroke({ color: 'rgba(255, 0, 0, 1)' }),
            fill: new Fill({ color: 'rgba(255, 0, 0, 0.5)' })
                  })
      })
 };

export default styles;