import React, { useEffect } from 'react';

export default function ClientsAnswers() {
  useEffect(() => {
    console.log("in 'ClientsAnswers' useEffect");
  }, []);
  return <div>ClientsAnswers</div>;
}
