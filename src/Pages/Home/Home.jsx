import React from 'react'
import Styles from './Home.module.scss'
import Button from '../../Components/button/Button'

export default function Home() {
  return (
    <>
      <div className={Styles.MainContainer}>
        home
        <Button />
      </div>
    </>
  )
}
