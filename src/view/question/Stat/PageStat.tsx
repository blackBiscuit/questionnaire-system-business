import { FC, useState, useEffect, MouseEvent } from 'react'
import { useParams } from 'react-router-dom'
import { Typography, Table, Pagination } from 'antd'
import { useRequest } from 'ahooks'
import type { ColumnsType, ColumnType } from 'antd/es/table'
import Loading from '../../../components/Loading'
import { getQuestionStatListServices } from '../../../services/stat'
import { StatQuestion, AnswerProps } from '../../../types/stat'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { QuestionComponentType } from '../../../components/QuestionComponents'
import { DEFAULT_STAT_PAGE_SIZE } from '../../../const'
const { Title } = Typography
interface Props {
  selectedComponentId: string
  onSelectedIdAndType?: (id: string, type: QuestionComponentType | null) => void
}
export default ((props) => {
  const { id = '' } = useParams()
  const { selectedComponentId, onSelectedIdAndType } = props
  const [total, setTotal] = useState(0)
  const [list, setList] = useState<AnswerProps[]>([])
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(DEFAULT_STAT_PAGE_SIZE)
  const { componentList } = useGetComponentInfo()
  const { loading } = useRequest(
    async () => {
      const res = await getQuestionStatListServices<StatQuestion>(id)
      return res
    },

    {
      refreshDeps: [page, pageSize, id],
      onSuccess(res) {
        const { total, list } = res
        setTotal(total)
        setList(list)
      }
    }
  )
  const handleClick = (
    e: MouseEvent,
    id: string,
    type: QuestionComponentType | null
  ) => {
    e.stopPropagation()
    onSelectedIdAndType && onSelectedIdAndType(id, type)
  }
  //const tableColumns: ColumnsType<DataType>
  const tableColumns: ColumnsType<Record<string, string>> = componentList.map(
    (c) => {
      const { component_id, title, props, type } = c
      const realTitle = (props as { title?: string }).title || title
      const tableColumns: ColumnType<Record<string, string>> = {
        width: componentList.length > 5 ? 200 : '',
        title: (
          <div
            onClick={(e) => {
              handleClick(e, component_id, type)
            }}
            style={{
              cursor: 'pointer'
            }}
          >
            <span
              style={{
                color: component_id === selectedComponentId ? '#1890ff' : ''
              }}
            >
              {realTitle}
            </span>
          </div>
        ),
        dataIndex: component_id
        // ellipsis: true
      }
      return tableColumns
    }
  )
  const dataSource = list.map((item) => ({ ...item, key: item.id }))
  useEffect(() => {
    console.log(tableColumns, dataSource)
  }, [tableColumns, dataSource])
  return (
    <div>
      <Title level={3}>答卷数量:{!loading ? total : ''}</Title>
      {loading ? (
        <Loading size="default" />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <div
            onClick={(e) => {
              handleClick(e, '',null)
            }}
            style={{ height: 'calc(100vh - 57px - 200px)', overflow: 'auto' }}
          >
            <Table
              columns={tableColumns}
              dataSource={dataSource}
              pagination={false}
            />
          </div>

          <div style={{ textAlign: 'center', marginTop: '25px' }}>
            <Pagination
              total={total}
              current={page}
              pageSize={pageSize}
              onChange={(page) => {
                setPage(page)
              }}
              onShowSizeChange={(page, size) => {
                setPage(page)
                setPageSize(size)
              }}
            />
          </div>
        </div>
      )}
    </div>
  )
}) as FC<Props>
