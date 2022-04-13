import React from 'react'

export default function datechanger() {
    date = new Date({Birthdate});
  year = date.getFullYear();
  month = date.getMonth()+1;
  dt = date.getDate();
  
  if (dt < 10) {
    dt = '0' + dt;
  }
  if (month < 10) {
    month = '0' + month;
  }
  
  console.log(year+'-' + month + '-'+dt);
  return (
    <div>date-changer</div>
  )
}
