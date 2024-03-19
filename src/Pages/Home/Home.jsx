import React from 'react'
import Styles from './Home.module.scss'
import SideBarMenu from '../../Components/SideBarMenu/SideBarMenu'
import Content from './HomePageComponents/Content'
import HomePageSideBarMenu from '../../Components/HomePageSideBarMenu/HomePageSideBarMenu'
import HomePageContent from './HomePageComponents/HomePageContent'
import Members from '../../Components/Members/Members'

export default function Home() {
  return (
    <>
      {/* Testing purposes only! In production delete background styling */}
      <div style={{ background: "none" }} className={Styles.MainContainer}>
        <HomePageSideBarMenu />
        <Members />
        {/* <HomePageContent /> */}
        {/* <SideBarMenu />
        <Content /> */}
      </div>
    </>
  )
}
