import React from 'react'
import Styles from './Home.module.scss'
import Alert from 'react-bootstrap/Alert';

export default function Home() {
  return (
    <>
      <div  className={Styles.MainContainer}>
        home
        <div style={{color:"red"}} className="fs-2 pb-3">huasdfsd</div>
        <div className="ads2">huasdfsd</div>
        <div className="ads 123">huasdfsd</div>
        <button className={Styles.button32}></button>
        <>
          {[
            'primary',
            'secondary',
            'success',
            'danger',
            'warning',
            'info',
            'light',
            'dark',
          ].map((variant) => (
            <Alert key={variant} variant={variant}>
              This is a {variant} alert—check it out!
            </Alert>
          ))}
        </>
      </div>
    </>
  )
}
