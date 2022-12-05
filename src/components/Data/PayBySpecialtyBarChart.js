import React, {useEffect, useState} from 'react';
import {csv} from 'd3';
import * as vega from 'vega';
import * as vegaLite from 'vega-lite';
import * as vl from 'vega-lite-api';
import * as vegaTooltip from 'vega-tooltip';
import payGroupBySpecialty from './paymentGroupByStateType.csv';

export const PayBySpecialtyBarChart = () => {
    const row = d => {
    d.Payment = +Number(d.Payment);
    return d;
  };

  const getData = async () => {
    const data = csv(payGroupBySpecialty, row);
    return data;
  };

  const viz = vl.markBar().encode(
    vl.x().fieldN('State').title('State'),
    vl.y().fieldQ('Payment').scale({ zero: true }).title("Dollors Spent"),
    vl.color().fieldN('Specialty').title('Specialty'),
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
    document.getElementById('vis').appendChild(await marks.render());
  };

  run();

  return (<>
    <div className="PayBySpecialtyBarChart">
        <h1>Pay By Specialty Bar Chart</h1>
        <div id="vis"></div>
    </div>
    </>);
};