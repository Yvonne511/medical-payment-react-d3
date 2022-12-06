import {geoPath} from 'd3';

//const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const path = geoPath();
let count = 0;
const missingDataColor = 'gray';

export const MapMarks = ({ 
    usAtals: { states, nation, interiors },
    data,
    rowByAbbrevCode,
    colorScale,
    colorValue
 }) => (
    <g className="marks">
    {/* {data.features.map(state => 
     (<path key={count++} d={path(state)} />))} */}
     <svg viewBox="0 0 975 610">
     <g fill="none" stroke="#000" strokeLinejoin="round" strokeLinecap="round">
        {states.features.map(feature => {
            const d = rowByAbbrevCode.get(feature.properties.name);
            if(!d){
              console.log(feature.properties.name);
            }
            return (
                <path key={count++} 
                fill={d ? colorScale(colorValue(d)) : missingDataColor}
                d={path(feature)} />
            );
        })}
        <path className="interiors" d={path(interiors)} />
     </g>
     </svg>
    </g>
);
