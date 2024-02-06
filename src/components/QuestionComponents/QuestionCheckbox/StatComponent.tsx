import { FC, useState } from 'react'
import { Button, Modal } from 'antd'
import {
  Bar,
  BarChart,
  Cell,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  XAxis,
  YAxis
} from 'recharts'
import { QuestionCheckStatPropsType } from './interface'
import { STAT_COLORS } from '../../../const/stat'

export default ((props) => {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const { stat, title } = props
  const width = stat.length * 100
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const chart = (
    <div
      style={{
        width: `${width}px`,
        height: '400px'
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={stat}
          width={width}
          height={300}
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
      </ResponsiveContainer>
    </div>
  )

  return (
    <div>
      <div
        style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '30px' }}
      >
        {chart}
      </div>
      <Modal
        title={title}
        width={width + 100}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            关闭
          </Button>
        ]}
      >
        {chart}
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
