import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'

function handleErrors (response) {
  if (!response.ok) {
    throw Error(response.statusText);
  }
  return response;
}

export const FacebookLogin = (props) => {
  const {
    facebookLoginCallback,
  } = props;
  
  console.log(window.location.href);
  fetch(window.location.href)
    .then((res) => (handleErrors(res)))
    .then((res) => (res.json()))
    .then((data) => {
      console.log(data);
      //window.location.href = '/';
      facebookLoginCallback(data);
    })
    .catch((err) => console.log(err));
    
  return(<Redirect to='/' />);
};

export const GoogleLogin = (props) => {
  const {
    googleLoginCallback,
  } = props;
  console.log('in googleLogin');
  console.log(window.location.href);
  fetch(window.location.href)
    .then((res) => (handleErrors(res)))
    .then((res) => (res.json()))
    .then((data) => {
      console.log(data);
      //window.location.href = '/';
      googleLoginCallback(data);
    })
    .catch((err) => console.log(err));
    
    
  return(<Redirect to='/' />);
};