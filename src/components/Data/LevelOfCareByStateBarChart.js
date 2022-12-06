import React from 'react';
import {csv} from 'd3';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
import StateLevelOfCare from './StateLevelOfCare.csv';

export const LevelOfCareByStateBarChart = () => {
    const row = d => {
    d.CareLevel = d.LevelOfCare.split(" and ")[0];
    if (d.LevelOfCare != "Not Available") {
      d.PaymentLvel = d.LevelOfCare.split(" and ")[1];
    } else {
      d.PaymentLvel = "Not Available";
    }
    return d;
  };

  const getData = async () => {
    const data = csv(StateLevelOfCare, row);
    console.log(data);
    return data;
  };

  const viz = vl.markCircle().encode(
    vl.facet().fieldO("State").columns(8),
    vl.y().fieldN('CareLevel').title('Level of Care').sort(["Not Available", "Better Complications", "Average Complications", "Worse Complications", "Better Mortality", "Average Mortality", "Worse Mortality"]),
    vl.x().fieldN('PaymentLvel').title('Payment Level').sort(["Higher Payment", "Average Payment", "Lower Payment", "Not Available"]),
    vl.size().fieldQ('Count').title('Count'),
  );
  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call)}
  });

  const run = async () => {
    const marks = viz
    .data(await getData())
    .width(100)
    .height(100)
    .autosize({ type: 'fit', contains: 'padding' });
    document.getElementById('vislevelofcare').appendChild(await marks.render());
  };

  run();

  return (<>
    <div className="PayBySpecialtyBarChart">
        <h1>Level Of Pay By Level Of Care</h1>
        <div id="vislevelofcare"></div>
    </div>
    </>);
};