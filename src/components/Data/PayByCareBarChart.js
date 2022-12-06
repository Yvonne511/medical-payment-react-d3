import React from 'react';
import {csv} from 'd3';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
import paymentByLevelOfCare from "./paymentByLevelOfCare.csv";

export const PayByCareBarChart = () => {
  
  const row = d => {
    d.Payment = +Number(d.Payment);
    d.CareLevel = d.LevelOfCare.split(" and ")[0];
    if (d.LevelOfCare != "Not Available") {
      d.PaymentLvel = d.LevelOfCare.split(" and ")[1];
    } else {
      d.PaymentLvel = "Not Available";
    }
    return d;
  };

  const getData = async () => {
    const data = csv(paymentByLevelOfCare, row);
    return data;
  };

  const viz = vl.markBar().title("Level of Care vs Payment Amount").encode(
    vl.x().fieldN('CareLevel').title('Level Of Care').sort(["Not Available", "Better Complications", "Average Complications", "Worse Complications", "Better Mortality", "Average Mortality", "Worse Mortality"]),
    vl.y().fieldQ('Payment').scale({ zero: true }).title("Dollors Spent"),
  );
  vl.register(vega, vegaLite, {
    view: { renderer: 'svg' },
    init: view => { view.tooltip(new vegaTooltip.Handler().call)}
  });

  const run = async () => {
    const marks = viz
    .data(await getData())
    .width(600)
    .height(400)
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