import React, { useState, useEffect } from 'react';
import { json } from 'd3';
import PayByStateData from "./paymentGroupByState.csv";
import PayByStateDataOY from "./paymentGroupByStateOY.csv";
import {csv} from 'd3';

const row = d => {
    d.Payment = +Number(d.Payment);
    return d;
};

export const UseStateData = () => {
  const [data, setStateData] = useState(null);
  if (data) {console.log(data)};
  useEffect(() => {
    csv(PayByStateData, row).then(setStateData);
  }, []);

  return data;
};

export const UseStateDataOY = () => {
  const [data, setStateData] = useState(null);
  if (data) {console.log(data)};
  useEffect(() => {
    csv(PayByStateDataOY, row).then(setStateData);
  }, []);

  return data;
};