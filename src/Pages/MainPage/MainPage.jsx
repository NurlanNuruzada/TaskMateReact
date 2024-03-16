import React from 'react'
import HomePageSideBarMenu from '../../Components/HomePageSideBarMenu/HomePageSideBarMenu'
import HomePageContent from './HomePageComponents/HomePageContent'
import Styles from './Home.module.scss'
export default function MainPage() {
    return (
        <div className={Styles.MainContainer}>
            <HomePageSideBarMenu />
            <HomePageContent />
        </div>
    )
}
