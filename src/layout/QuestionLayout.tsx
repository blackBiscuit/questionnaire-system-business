import { FC } from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import useNavPage from '../hooks/useNavPage'
import Loading from '../components/Loading'
export default (() => {
  const { waitingUserData, } = useLoadUserData()
   useNavPage(waitingUserData)
  return (
    <>
      <div>
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
      </div>
    </>
  )
}) as FC
