import React from 'react';
import AllPets from '../components/AllPets';
import MyShelterPets from '../components/MyShelterPets';

const Pets = ({ activeRole }) => {
  return (
    <div>
      {activeRole === 'SHELTER' ? <MyShelterPets /> : <AllPets />}
    </div>
  );
};

export default Pets;
