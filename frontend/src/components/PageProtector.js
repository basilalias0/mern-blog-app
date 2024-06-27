import React from 'react';
import {Navigate} from 'react-router-dom'
import { getUserData } from '../Utils/cookieHandler';


const PageProtector = ({children}) => {

    const isUser =getUserData()
    console.log(isUser);

  if(isUser){
    return children
  }else{
    return <Navigate to='/'/>
  }
}

export default PageProtector;
