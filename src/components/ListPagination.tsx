import { FC, useEffect, useState } from 'react'
import { Pagination } from 'antd'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
import {
  LIST_PAGE_PARAM_KEY,
  DEFAULT_LIST_PAGE_SIZE,
  LIST_PAGE_SIZE_PARAM_KEY
} from '../const'

interface Props {
  total?: number
}
export default ((props) => {
  const { total = 0 } = props
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_LIST_PAGE_SIZE)

  useEffect(() => {
    const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
    const pageSize =
      Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) ||
      DEFAULT_LIST_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])
  const handleChange = (page: number, pageSize: number) => {
    // navigate(
    //     `${pathname}?${LIST_PAGE_PARAM_KEY}=${
    //       page ? page : 1
    //     }&${LIST_PAGE_SIZE_PARAM_KEY}=${pageSize}`
    //   )
    searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    navigate(`${pathname}?${searchParams.toString()}`)
  }
  return (
    <>
      <Pagination
        pageSize={pageSize}
        current={current}
        onChange={handleChange}
        showQuickJumper
        // showSizeChanger={false}
        total={total}
      />
    </>
  )
}) as FC<Props>
