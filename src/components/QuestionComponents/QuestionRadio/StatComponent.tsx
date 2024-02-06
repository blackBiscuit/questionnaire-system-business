import { FC, useMemo, useState } from 'react'
import { Button, Modal } from 'antd'
import { Pie, PieChart, Cell, Tooltip, ResponsiveContainer } from 'recharts'
import { QuestionRadioStatPropsType } from './interface'
import { AnswerStat } from '../../../types/stat'
import { STAT_PIE_COLORS } from '../../../const/stat'
import { format } from '../../../utils'
export default ((props) => {
  const { stat, title } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  
  const getChart = (width = 500) => {
    return (
      <div
        style={{
          width: `${width}px`,
          height: '400px'
        }}
      >
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              width={width}
              data={stat}
              dataKey="count"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100} //直径
              fill="#8884d8"
              label={(item: AnswerStat) =>
                `${item.name}:${format(item.count / sum)}%`
              }
            >
              {stat.map((_item, i) => (
                <Cell key={i} fill={STAT_PIE_COLORS[i]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    )
  }
  const handleOk = () => {
    setIsModalOpen(false)
  }

  const handleCancel = () => {
    setIsModalOpen(false)
  }
  const sum = useMemo(() => {
    return stat.reduce((pre, current) => pre + current.count, 0)
  }, [stat])
  return (
    <div>
      <div
        style={{ overflowX: 'auto', overflowY: 'hidden', marginBottom: '30px' }}
      >
        {getChart(500)}
      </div>
      <Modal
        title={title}
        width={900}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
        footer={[
          <Button type="primary" onClick={handleCancel}>
            关闭
          </Button>
        ]}
      >
        {getChart(800)}
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
}) as FC<QuestionRadioStatPropsType>
