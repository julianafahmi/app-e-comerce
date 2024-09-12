import React, { useEffect, useState } from 'react'
import styles from'./Loader.module.css';

export default function Loader() {
    useEffect(()=>{},[]);
    let[count,setCount]=useState(0)
  return (
    <div>Loader</div>
  )
}
