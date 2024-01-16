import {
  FC,
  useState,
  useRef,
  useEffect,
  KeyboardEvent,
  FocusEvent
} from 'react'
import { useDispatch } from 'react-redux'
import { Input, Button, Space, message } from 'antd'
import classNames from 'classnames'
import { EyeInvisibleOutlined, LockOutlined } from '@ant-design/icons'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import {
  changeComponentHiddenReducer,
  changeComponentTitleReducer,
  changeSelectedId,
  lockedComponentReducer,
  moveComponentReducer
} from '../../../store/componentReducer'
import SortableContainer from '../../../components/DragSortable/SortableContainer'
import SortableItem from '../../../components/DragSortable/SortableItem'
import styles from './Layer.module.scss'
export default (() => {
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')
  const { componentList, selectedId } = useGetComponentInfo()
  const wrapperRef = useRef<null | HTMLDivElement>(null)
  const selectedClassName = styles.selected
  const titleDefaultClassName = styles.title
  const lockedClassName = styles.locked
  const handleSelectedClick = (id: string) => {
    const currentComponent = componentList.find(
      (component) => component.component_id === id
    )
    if (currentComponent && currentComponent.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (currentComponent && id !== selectedId) {
      dispatch(changeSelectedId(id))
      setChangingTitleId('')
      return
    }
    setChangingTitleId(id)
  }
  const handPressEnterSelectedComponentTitle = (
    e: KeyboardEvent<HTMLInputElement> | FocusEvent<HTMLInputElement>,
    title: string
  ) => {
    const target = e.target as HTMLInputElement

    if (!selectedId) return
    const newTitle = target.value.trim() || title
    dispatch(changeComponentTitleReducer(newTitle))
    console.log(newTitle)
  }
  const changeHidden = (id: string, hidden: boolean) => {
    dispatch(
      changeComponentHiddenReducer({
        id,
        hidden
      })
    )
  }
  const changeLocked = (id: string) => {
    dispatch(lockedComponentReducer(id))
  }
  // 设置完changingTitleId后，使鼠标聚焦在选中的input输入框内
  useEffect(() => {
    const wrapper = wrapperRef.current
    if (changingTitleId && wrapper) {
      const input =
        wrapper.querySelector<HTMLInputElement>('input[type="text"]')
      input && input.focus()
    }
  }, [changingTitleId])
  const componentListWithId = componentList.map((c) => {
    return { ...c, id: c.component_id }
  })
  const handleDragEnd = (oldIndex: number, newIndex: number) => {
    if (componentList[oldIndex].isLocked || componentList[newIndex].isLocked) {
      message.info('不能选中锁定的组件')
      return
    }
    dispatch(moveComponentReducer({ oldIndex, newIndex }))
  }
  return (
    <div ref={wrapperRef}>
      <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
        {componentList.map((component) => {
          const { component_id, title = '', isHidden, isLocked } = component
          const titleClassName = classNames(titleDefaultClassName, {
            [selectedClassName]: component_id === selectedId,
            [lockedClassName]: isLocked
          })
          return (
            <SortableItem key={component_id} id={component_id}>
              <div className={styles.wrapper}>
                <div
                  className={titleClassName}
                  onClick={() => handleSelectedClick(component_id)}
                >
                  {component_id === changingTitleId ? (
                    <Input
                      defaultValue={title}
                      onBlur={(e) => {
                        setChangingTitleId('')
                        handPressEnterSelectedComponentTitle(e, title)
                      }}
                      onPressEnter={(e) => {
                        setChangingTitleId('')
                        handPressEnterSelectedComponentTitle(e, title)
                      }}
                    />
                  ) : (
                    title
                  )}
                </div>
                <div className={styles.handler}>
                  <Space>
                    <Button
                      shape="circle"
                      className={!isHidden ? styles.btn : ''}
                      type={isHidden ? 'primary' : 'text'}
                      size="small"
                      icon={<EyeInvisibleOutlined />}
                      onClick={() => {
                        changeHidden(component_id, !isHidden)
                      }}
                    ></Button>
                    <Button
                      shape="circle"
                      className={!isLocked ? styles.btn : ''}
                      type={isLocked ? 'primary' : 'text'}
                      size="small"
                      icon={<LockOutlined />}
                      onClick={() => {
                        changeLocked(component_id)
                      }}
                    ></Button>
                  </Space>
                </div>
              </div>
            </SortableItem>
          )
        })}
      </SortableContainer>
    </div>
  )
}) as FC
