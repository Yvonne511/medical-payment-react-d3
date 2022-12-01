import { useState, useEffect } from 'react';
import { feature, mesh } from 'topojson';
import { json } from 'd3';

const jsonUrl = 'https://cdn.jsdelivr.net/npm/us-atlas@3/states-albers-10m.json';
//'https://unpkg.com/us-atlas@2.1.0/us/10m.json';
//'https://unpkg.com/world-atlas@2.0.2/countries-50m.json';

export const UseUSAtlas = () => {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    json(jsonUrl).then(topojsonData => {
      const {states, nation} = topojsonData.objects;
      setData({
        states: feature(topojsonData, states),
        nation: feature(topojsonData, nation),
        interiors: mesh(topojsonData, states, (a, b) => a !== b)
      });
    });
  }, []);

  return data;
};
