import React, { Component, useEffect, useState  } from 'react';

const Request = (data, type, propertyReq) => {
  console.log(data)
  const requestOptions = {
    method: type,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(
      {
        "PropertyValue": data,
        "GenerateTransaction": true
      }
    )
  };
  fetch(propertyReq, requestOptions)
  .then(response => response.status === 200 ? console.log("success") : console.log("error"))
}

export default Request