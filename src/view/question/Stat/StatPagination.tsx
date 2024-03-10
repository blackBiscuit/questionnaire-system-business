import { Pagination } from 'antd'
import { FC, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import {
  DEFAULT_STAT_PAGE_SIZE,
  LIST_PAGE_PARAM_KEY,
  LIST_PAGE_SIZE_PARAM_KEY
} from '../../../const'

interface Props {
  total?: number
}
export default ((props) => {
  const { total = 0 } = props
  const [searchParams, setSearchParams] = useSearchParams()
  const [current, setCurrent] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_STAT_PAGE_SIZE)
  useEffect(() => {
    const page = Number(searchParams.get(LIST_PAGE_PARAM_KEY)) || 1
    const pageSize =
      Number(searchParams.get(LIST_PAGE_SIZE_PARAM_KEY)) ||
      DEFAULT_STAT_PAGE_SIZE
    setCurrent(page)
    setPageSize(pageSize)
  }, [searchParams])
  const handleChange = (page: number, pageSize: number) => {
    // searchParams.set(LIST_PAGE_PARAM_KEY, page.toString())
    // searchParams.set(LIST_PAGE_SIZE_PARAM_KEY, pageSize.toString())
    // navigate(`${pathname}?${searchParams.toString()}`)
    setSearchParams({
      [LIST_PAGE_PARAM_KEY]: page.toString(),
      [LIST_PAGE_SIZE_PARAM_KEY]: pageSize.toString()
    })
  }
  return (
    <div style={{ textAlign: 'center', marginTop: '25px' }}>
      <Pagination
        pageSize={pageSize}
        current={current}
        onChange={handleChange}
        showQuickJumper
        // showSizeChanger={false}
        total={total}
      />
    </div>
  )
}) as FC<Props>
