import { FC } from 'react'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import { Space, Button, Tooltip, message } from 'antd'
import {
  DeleteOutlined,
  EyeInvisibleOutlined,
  LockOutlined,
  CopyOutlined,
  BlockOutlined,
  UpOutlined,
  DownOutlined,
  UndoOutlined,
  RedoOutlined
} from '@ant-design/icons'
import {
  deleteSelectedComponentReducer,
  changeComponentHiddenReducer,
  lockedComponentReducer,
  copySelectedComponentReducer,
  pasteCopiedComponentReducer,
  moveComponentReducer
} from '../../../store/componentReducer'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import useGetUndoInfo from '../../../hooks/useGetUndoInfo'
export default (() => {
  const dispatch = useDispatch()
  const { selectedId, selectedComponent, copiedComponent, componentList } =
    useGetComponentInfo()
  const { past } = useGetUndoInfo()
  const { isLocked } = selectedComponent || {}
  // const computedMoveIndex = (
  //   // oldIndex: number,
  //   type: 'increase' | 'decrease'
  // ) => {
  //   if (selectedComponent?.isLocked) {
  //     message.info('不能移动锁定的组件')
  //     return
  //   }
  //   const oldIndex = componentList.findIndex(
  //     (c) => c.component_id === selectedId
  //   )
  //   if (oldIndex < 0) return
  //   const progressiveNum = type === 'increase' ? 1 : -1
  //   const index = oldIndex + progressiveNum
  //   const moveTypeObj: ComputedIndexType = {
  //     type: 'move',
  //     index
  //   }
  //   while (
  //     componentList[moveTypeObj.index]?.isLocked ||
  //     moveTypeObj.index < 0 ||
  //     moveTypeObj.index > componentList.length - 1
  //   ) {
  //     moveTypeObj.index += progressiveNum
  //     if (moveTypeObj.index < 0) {
  //       moveTypeObj.type = 'insert'
  //       moveTypeObj.index = componentList.length - 1
  //     }
  //     console.log(moveTypeObj.index)
  //     if (moveTypeObj.index > componentList.length - 1) {
  //       moveTypeObj.type = 'insert'
  //       moveTypeObj.index = 0
  //     }
  //   }
  //   if (moveTypeObj.type === 'move') {
  //     dispatch(moveComponentReducer({ newIndex: moveTypeObj.index, oldIndex }))
  //   } else {
  //     dispatch(insertComponentReducer(moveTypeObj.index))
  //   }
  // }
  const computedMoveIndex = (type: 'increase' | 'decrease') => {
    if (selectedComponent?.isLocked) {
      message.info('不能移动锁定的组件')
      return
    }
    const oldIndex = componentList.findIndex(
      (c) => c.component_id === selectedId
    )
    if (oldIndex < 0) return
    const progressiveNum = type === 'increase' ? 1 : -1

    const newIndex = oldIndex + progressiveNum
    if (newIndex > componentList.length - 1 || newIndex < 0) {
      return
    }
    if (componentList[newIndex].isLocked) {
      message.info('不能和已锁定的组件交换位置')
      return
    }
    dispatch(moveComponentReducer({ newIndex, oldIndex }))
  }
  const handleDelete = () => {
    dispatch(deleteSelectedComponentReducer())
  }
  const handleHidden = () => {
    dispatch(
      changeComponentHiddenReducer({
        id: selectedId,
        hidden: true
      })
    )
  }
  const handleLock = () => {
    dispatch(lockedComponentReducer(selectedId))
  }
  const handleCopy = () => {
    dispatch(copySelectedComponentReducer())
  }
  const handlePaste = () => {
    dispatch(pasteCopiedComponentReducer())
  }
  const handleUp = () => {
    computedMoveIndex('decrease')
  }
  const handleDown = () => {
    computedMoveIndex('increase')
    // dispatch(sortComponentReducer())
  }
  // 撤销
  const handleUndo = () => {
    // 解决redux-undo把redux初始化数据加入past数组的问题
    if (past.length === 1) return
    dispatch(ActionCreators.jumpToPast(past.length - 1))
  }
  //重做
  const handleRedo = () => {
    dispatch(ActionCreators.redo())
  }
  return (
    <Space>
      <Tooltip title="删除" color="#108ee9">
        <Button
          shape="circle"
          icon={<DeleteOutlined />}
          onClick={handleDelete}
        ></Button>
      </Tooltip>
      <Tooltip title="隐藏" color="#108ee9">
        <Button
          shape="circle"
          icon={<EyeInvisibleOutlined />}
          onClick={handleHidden}
        ></Button>
      </Tooltip>
      <Tooltip title={isLocked ? '解除锁定' : '锁定'} color="#108ee9">
        <Button
          type={isLocked ? 'primary' : 'default'}
          shape="circle"
          icon={<LockOutlined />}
          onClick={handleLock}
        ></Button>
      </Tooltip>
      <Tooltip title="复制" color="#108ee9">
        <Button
          shape="circle"
          icon={<CopyOutlined />}
          onClick={handleCopy}
        ></Button>
      </Tooltip>
      <Tooltip title="粘贴" color="#108ee9">
        <Button
          shape="circle"
          icon={<BlockOutlined />}
          onClick={handlePaste}
          disabled={copiedComponent === null}
        ></Button>
      </Tooltip>
      <Tooltip title="上移" color="#108ee9">
        <Button
          shape="circle"
          icon={<UpOutlined />}
          onClick={handleUp}
          disabled={!selectedId}
        ></Button>
      </Tooltip>
      <Tooltip title="下移" color="#108ee9">
        <Button
          shape="circle"
          icon={<DownOutlined />}
          onClick={handleDown}
          disabled={!selectedId}
        ></Button>
      </Tooltip>
      <Tooltip title="撤销" color="#108ee9">
        <Button
          shape="circle"
          icon={<UndoOutlined />}
          onClick={handleUndo}
        ></Button>
      </Tooltip>
      <Tooltip title="重做" color="#108ee9">
        <Button
          shape="circle"
          icon={<RedoOutlined />}
          onClick={handleRedo}
        ></Button>
      </Tooltip>
    </Space>
  )
}) as FC
