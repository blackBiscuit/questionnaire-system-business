import { FC } from 'react'
import { Outlet } from 'react-router-dom'
export default (() => {
  return (
    <>
      <div>question layout</div>
      <div>
        <Outlet />
      </div>
    </>
  )
}) as FC
