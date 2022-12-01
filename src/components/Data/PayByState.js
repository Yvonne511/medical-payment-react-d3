import * as d3 from "d3";
import React from "react";
import { UseData } from './UseUSAtlas';
import { MapMarks } from './MapMarks';
import { UseUSAtlas } from './UseUSAtlas';

const width = 960;
const height = 500;

const PayByState = () => {
    const usAtalasData = UseUSAtlas();
    if (!usAtalasData) {
        return <pre>Loading...</pre>;
    }
    return (
        <>
        <div className="PayByState">
        <h1>Pay By State</h1>
        </div>
        <svg width={width} height={height}>
        <MapMarks data={usAtalasData} />
        </svg>
        </>
    );
};

export default PayByState;