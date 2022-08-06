import React, { useEffect } from 'react';

export default function Clients() {
  useEffect(() => {
    console.log("in 'Clients' useEffect");
  }, []);
  return <div>Clients</div>;
}
