import React from 'react';
import {csv} from 'd3';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
import PayByLevelOfCare from "./PayByLevelOfCare.csv";

export const PayByCareBarChart = () => {
  
  const row = d => {
    d.Payment = +Number(d.Payment);
    return d;
  };

  const getData = async () => {
    const data = csv(PayByLevelOfCare, row);
    return data;
  };

  const viz = vl.markBar().encode(
    vl.x().fieldN('LevelOfCare').title('LevelOfCare'),
    vl.y().fieldQ('Payment').scale({ zero: true }).title("Dollors Spent"),
  );
  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call)}
  });

  const run = async () => {
    const marks = viz
    .data(await getData())
    .width(900)
    .height(600)
    .autosize({ type: 'fit', contains: 'padding' });
    document.getElementById('viscare').appendChild(await marks.render());
  };

  run();


  return (<>
    <div className="PayByStateBarChart">
      <div id="viscare"></div>
    </div>
  </>);
};