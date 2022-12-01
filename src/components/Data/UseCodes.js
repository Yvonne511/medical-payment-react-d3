import { useState, useEffect } from 'react';
import { csv } from 'd3';

const csvUrl =
'https://raw.githubusercontent.com/jasonong/List-of-US-States/master/states.csv';

export const UseCodes = () => {
  const [data, setData] = useState(null);
  console.log(data);
  useEffect(() => {
    csv(csvUrl).then(setData);
  }, []);

  return data;
};