import { FC } from 'react'
import { Layout } from 'antd'
import { Outlet } from 'react-router-dom'
import Logo from '../components/Logo'
import UserInfo from '../components/UserInfo'
import styles from './MainLayout.module.scss'
import Loading from '../components/Loading'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
const { Header, Content, Footer } = Layout
export default (() => {
  const { waitingUserData } = useLoadUserData()
  useNavPage(waitingUserData)
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
        {waitingUserData ? (
          <div
            style={{
              width: '100%',
              height: 'calc(100vh - 64px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <Loading />
          </div>
        ) : (
          <Outlet />
        )}
      </Content>
      <Footer className={styles.floor}>
        饼干问卷 &copy;2023 - present. Created by 饼干
      </Footer>
      {/* <div className={styles.floor}>floor</div> */}
    </Layout>
  )
}) as FC
