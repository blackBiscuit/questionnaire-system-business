import { FC, ReactNode } from 'react'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  MouseSensor,
  useSensor,
  useSensors,
  DragEndEvent
} from '@dnd-kit/core'
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy
} from '@dnd-kit/sortable'
interface Props {
  children: ReactNode | ReactNode[]
  items: {
    id: string
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    [key: string]: any
  }[]
  onDragEnd?: (oldIndex: number, newIndex: number) => void
}
export default ((props) => {
  const { children, items, onDragEnd } = props
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        //需要拖拽8px才会触发拖拽行为 避免和click event 冲突
        distance: 8
      }
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates
    })
  )
  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event
    if (!over) return
    if (active.id !== over.id) {
      const oldIndex = items.findIndex((item) => item.id === active.id)
      const newIndex = items.findIndex((item) => item.id === over.id)
      onDragEnd && onDragEnd(oldIndex, newIndex)
      //   setItems((items) => {
      //     const oldIndex = items.indexOf(active.id)
      //     const newIndex = items.indexOf(over.id)

      //     return arrayMove(items, oldIndex, newIndex)
      //   })
    }
  }
  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={handleDragEnd}
    >
      <SortableContext items={items} strategy={verticalListSortingStrategy}>
        {children}
      </SortableContext>
    </DndContext>
  )
}) as FC<Props>
