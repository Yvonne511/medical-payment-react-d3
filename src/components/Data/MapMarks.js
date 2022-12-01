import { geoAlbersUsa, geoPath } from 'd3';
import { feature, mesh } from 'topojson';

//const projection = geoAlbersUsa().scale(1300).translate([487.5, 305]);
const path = geoPath();
let count = 0;

export const MapMarks = ({ data }) => (
    <g className="marks">
    {/* {data.features.map(state => 
     (<path key={count++} d={path(state)} />))} */}
     <svg viewBox="0 0 975 610">
     <g fill="none" stroke="#000" strokeLinejoin="round" strokeLinecap="round">
        <path strokeWidth="0.5" d={path(mesh(data, data.objects.states, (a, b) => a !== b))}></path>
        <path d={path(feature(data, data.objects.nation))}></path>
     </g>
     </svg>
    </g>
);
