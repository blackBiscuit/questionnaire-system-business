import { FC, useMemo, useState } from 'react'
import { ulid } from 'ulid'
import { Button, Modal, Radio, Slider, Typography } from 'antd'
import Table, { ColumnsType } from 'antd/es/table'
import {
  Bar,
  BarChart,
  Cell,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Legend,
  ComposedChart,
  LineChart,
  Line
} from 'recharts'
import {
  ChartType,
  QuestionCheckStatPropsType,
  statTypeList
} from './interface'
import { STAT_COLORS, STAT_PIE_COLORS } from '../../../const/stat'
import { AnswerStat } from '../../../types/stat'
import { format } from '../../../utils'

interface DataType {
  option: string
  count: number
  proportion: number
}
const { Title } = Typography
export default ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [statType, setStatType] = useState<ChartType>('pie')
  const { stat, title } = props
  const filterStat = stat.filter((item) => item.count !== 0)
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const sum = useMemo(() => {
    return stat.reduce((pre, current) => pre + current.count, 0)
  }, [stat])
  const modalTitle = (
    <>
      <Title level={3} style={{ fontSize: '16px' }}>
        {title}
      </Title>
      <Radio.Group
        value={statType}
        onChange={(e) => setStatType(e.target.value)}
      >
        {statTypeList.map((item) => {
          return (
            <Radio.Button value={item.type} key={item.type}>
              {item.text}
            </Radio.Button>
          )
        })}
      </Radio.Group>
    </>
  )
  const getChart = (type: ChartType, width = 500) => {
    let Component = (
      <PieChart
        width={width}
        height={400}
        margin={{
          top: 20,
          right: 20,
          bottom: 20,
          left: 20
        }}
      >
        <Pie
          isAnimationActive={true}
          width={width}
          height={400}
          data={filterStat}
          dataKey="count"
          //  nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={100} //直径
          fill="#8884d8"
          label={(item: AnswerStat) =>
            `${item.name}:${format(item.count / sum)}%`
          }
        >
          {stat.map((_item, i) => (
            <Cell key={ulid()} fill={STAT_PIE_COLORS[i]} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    )
    if (type === 'line') {
      Component = (
        <BarChart
          data={stat}
          width={width}
          height={400}
          margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Bar dataKey="count">
            {stat.map((_item, i) => (
              <Cell key={i} fill={STAT_COLORS[i]} />
            ))}
          </Bar>
          <Tooltip />
        </BarChart>
      )
    }
    if (type === 'bar') {
      const size = (400 - 50) / stat.length < 20 ? 20 : (400 - 50) / stat.length
      Component = (
        <ComposedChart
          layout="vertical"
          width={width}
          height={400}
          data={stat}
          margin={{
            top: 20,
            right: 20,
            bottom: 20,
            left: 20
          }}
        >
          <CartesianGrid stroke="#f5f5f5" />
          <XAxis type="number" />
          <YAxis dataKey="name" type="category" scale="band" />
          <Tooltip />
          <Legend />

          <Bar dataKey="count" barSize={size} fill={STAT_COLORS[4]}>
            {stat.map((_item, i) => (
              <Cell key={i} fill={STAT_COLORS[i]} />
            ))}
          </Bar>
        </ComposedChart>
      )
    }
    if (type === 'brokenLine') {
      Component = (
        <LineChart
          width={width}
          height={400}
          data={stat}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="count"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      )
    }
    if (type === 'table') {
      const columns: ColumnsType<DataType> = [
        {
          title: '选项',
          dataIndex: 'option',
          key: 'option'
        },
        {
          title: '小计',
          dataIndex: 'count',
          key: 'count',
         // defaultSortOrder: 'ascend',
          sorter: (a, b) => a.count - b.count,
        },
        {
          title: '比例',
          dataIndex: 'proportion',
          key: 'proportion',
          width: 300,
          render: (proportion: number) => {
            const v = Math.round(proportion * 100)
            return (
              <>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center'
                  }}
                >
                  <div
                    style={{
                      flex: 1,
                      marginRight: '8px'
                    }}
                  >
                    <Slider
                      //   tooltip={open ? { open } : {}}
                      value={v}
                    />
                  </div>
                  {`${v}%`}
                </div>
              </>
            )
          }
        }
      ]
      const dataSource = stat.map((item) => ({
        key: item.name,
        option: item.name,
        count: item.count,
        proportion: item.count / sum
      }))
      Component = (
        <Table pagination={false} columns={columns} dataSource={dataSource} />
      )
    }
    return (
      <div
        style={{
          width: `${width}px`,
          height: '400px'
        }}
      >
        {Component}
      </div>
    )
  }
  return (
    <div>
      <Radio.Group
        value={statType}
        onChange={(e) => setStatType(e.target.value)}
      >
        {statTypeList.map((item) => {
          return (
            <Radio.Button value={item.type} key={item.type}>
              {item.text}
            </Radio.Button>
          )
        })}
      </Radio.Group>
      <div
        style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '30px' }}
      >
        {getChart(statType)}
      </div>
      <Modal
        title={modalTitle}
        width={900}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={() => (
          <Button type="primary" onClick={handleCancel}>
            关闭
          </Button>
        )}
      >
        <div
          style={{
            overflowY: 'auto',
            height: '420px'
          }}
        >
          {getChart(statType, 800)}
        </div>
      </Modal>
      <Button
        block
        type="primary"
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        查看完整图表
      </Button>
    </div>
  )
}) as FC<QuestionCheckStatPropsType>
