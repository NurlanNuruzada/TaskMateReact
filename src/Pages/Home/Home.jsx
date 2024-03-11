import React from 'react'
import Styles from './Home.module.scss'
import SideBarMenu from '../../Components/SideBarMenu/SideBarMenu'
export default function Home() {
  return (
    <>
      <div className={Styles.MainContainer}>
        <SideBarMenu />
      </div>
    </>
  )
}
