import React from 'react'
import Styles from './Home.module.scss'
import SideBarMenu from '../../Components/SideBarMenu/SideBarMenu'
import Content from './HomePageComponents/Content'
import CardList from '../../Components/SideBarMenu/CardList/CardList'
export default function Home() {
  return (
    <>
      <div className={Styles.MainContainer}>
        <SideBarMenu />
        <Content />
      </div>
    </>
  )
}
