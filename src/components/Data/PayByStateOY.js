import * as d3 from "d3";
import React from "react";
import { interpolateYlOrRd, scaleSequential, max } from 'd3';
import { UseUSAtlas } from './UseUSAtlas';
import { UseStateDataOY } from './UseStateData';
import { MapMarks } from './MapMarks';
import { UseCodes } from './UseCodes';

const width = 960;
const height = 500;

const PayByState = () => {
    const usAtalasData = UseUSAtlas();
    const data = UseStateDataOY();
    const codes = UseCodes();
    if (!usAtalasData || !data || !codes) {
        return <pre>Loading...</pre>;
    }

    const stateCodeByAbrewCode = new Map();
    codes.forEach(code => {
    const state = code['State'];
    const abbrev = code['Abbreviation'];
    stateCodeByAbrewCode.set(abbrev, state);
    });

    const rowByAbbrevCode = new Map();
    data.forEach(d => {
        const abbrev = d.State;
        const state = stateCodeByAbrewCode.get(abbrev);
        rowByAbbrevCode.set(state, d);
    });
    
    const colorValue = d => d.Payment;
    const colorScale = scaleSequential(interpolateYlOrRd).domain([
        0,
        max(data, colorValue)
    ]);

    return (
        <>
        <div className="PayByState">
        <h1>Pay By State OY</h1>
        </div>
        <svg width={width} height={height}>
        <MapMarks 
            usAtals={usAtalasData} 
            rowByAbbrevCode = {rowByAbbrevCode}
            colorScale = {colorScale}
            colorValue = {colorValue}
            />
        </svg>
        </>
    );
};

export default PayByState;