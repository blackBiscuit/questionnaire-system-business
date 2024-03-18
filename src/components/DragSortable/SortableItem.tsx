import { FC, ReactNode } from 'react'
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
interface Props {
  id: string
  children: ReactNode
  dataSelectedId?: string
}
export default ((props) => {
  const { children, id, dataSelectedId } = props
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id })
  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  }
  return (
    <div
      data-selected-id={dataSelectedId}
      {...attributes}
      style={style}
      {...listeners}
      ref={setNodeRef}
    >
      {children}
    </div>
  )
}) as FC<Props>
