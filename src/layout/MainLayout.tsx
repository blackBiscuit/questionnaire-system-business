import { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'
const { Header, Content, Footer } = Layout
export default (() => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>
          <UserInfo />
        </div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.floor}>
        饼干问卷 &copy;2023 - present. Created by 饼干
      </Footer>
      {/* <div className={styles.floor}>floor</div> */}
    </Layout>
  )
}) as FC
