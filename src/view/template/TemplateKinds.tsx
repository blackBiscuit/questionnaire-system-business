import { FC } from 'react'
import { Card, Col, Row } from 'antd'
import { useNavigate } from 'react-router-dom'
import { TemplateGroup } from '../../types/question'
interface Props {
  group?: TemplateGroup[]
}
export default ((props) => {
  const { group } = props
  const navigate = useNavigate()
  return (
    <div>
      <Row gutter={[16, 16]}>
        {group?.map((g) => (
          <Col span={8} key={g.id}>
            <Card
              title={g.title}
              bordered={false}
              hoverable={true}
              onClick={() => {
                navigate(`/group/${g.id}`)
                
              }}
            >
              <p
                style={{
                  height: '130px',
                  overflow: 'hidden'
                }}
              >
                {g.desc}
              </p>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  )
}) as FC<Props>
