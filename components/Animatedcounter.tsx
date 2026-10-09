'use client';

import React from 'react';
import CountUp from 'react-countup';

const Animatedcounter = ({amount}:{amount:number}) => {
  return (
    <div className='w-full'>
      <CountUp end={amount}
        duration={1}
        separator=","
        decimals={2}
        decimal="."
        prefix="₹"
      />
    </div>
  );
};

export default Animatedcounter;