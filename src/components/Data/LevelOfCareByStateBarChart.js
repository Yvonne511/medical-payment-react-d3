import React, {useEffect, useState} from 'react';
import {csv} from 'd3';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
import StateLevelOfCare from './StateLevelOfCare.csv';
//import PayByLevelOfCare from './PayByLevelOfCare.csv';

export const LevelOfCareByStateBarChart = () => {
    const row = d => {
    d.Payment = +Number(d.Payment);
    return d;
  };

  const getData = async () => {
    const data = csv(StateLevelOfCare, row);
    return data;
  };

  const viz = vl.markBar().encode(
    vl.x().fieldN('State').title('State'),
    vl.y().fieldQ('Count').scale({ zero: true }).aggregate('sum'),
    vl.color().fieldN('LevelOfCare').title('Level of Care'),
  );
  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call)}
  });

  const run = async () => {
    const marks = viz
    .data(await getData())
    .width(1100)
    .height(600)
    .autosize({ type: 'fit', contains: 'padding' });
    document.getElementById('vislevelofcare').appendChild(await marks.render());
  };

  run();

  return (<>
    <div className="PayBySpecialtyBarChart">
        <h1>Pay By Level Of Care Bar Chart</h1>
        <div id="vislevelofcare"></div>
    </div>
    </>);
};