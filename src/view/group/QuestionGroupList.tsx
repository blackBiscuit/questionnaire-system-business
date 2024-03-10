import { FC } from 'react'
import { TemplateGroupItemDesc } from '../../types/question'
import ListItem from './ListItem'
interface Props {
  list?: TemplateGroupItemDesc[]
}
export default ((props) => {
  const { list } = props
  return (
    <div>
      {list?.map((item) => (
        <ListItem key={item.id} item={item} />
      ))}
    </div>
  )
}) as FC<Props>
