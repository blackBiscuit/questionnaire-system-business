import { FC, useState, useEffect } from 'react'
import { Input } from 'antd'
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom'
import { LIST_SEARCH_PARAM_KEY } from '../const'
const { Search } = Input
export default (() => {
  const navigate = useNavigate()
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const [searchText, setSearchText] = useState('')
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value)
  }
  const handleSearch = (value: string) => {
    navigate(`${pathname}?${LIST_SEARCH_PARAM_KEY}=${value}`)
  }
  useEffect(() => {
    console.log(searchParams.get(LIST_SEARCH_PARAM_KEY))
    setSearchText(searchParams.get(LIST_SEARCH_PARAM_KEY) || '')
  }, [searchParams])
  return (
    <Search
      value={searchText}
      onChange={handleChange}
      onSearch={handleSearch}
      allowClear
      size="large"
      placeholder="输入关键字"
    />
  )
}) as FC
