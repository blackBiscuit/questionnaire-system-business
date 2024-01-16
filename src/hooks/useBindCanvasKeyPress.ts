import { useKeyPress } from 'ahooks'
import { useDispatch } from 'react-redux'
import { ActionCreators } from 'redux-undo'
import useGetUndoInfo from './useGetUndoInfo'
import {
  deleteSelectedComponentReducer,
  copySelectedComponentReducer,
  pasteCopiedComponentReducer,
  selectPrevComponentReducer,
  selectNextComponentReducer
} from '../store/componentReducer'
//判断document.activeElement是否合法
const isActiveElementValid = () =>
  document.activeElement === document.body ||
  document.activeElement?.matches('div[role="button"]')
const useBindCanvasKeyPress = () => {
  const dispatch = useDispatch()
  const { past } = useGetUndoInfo()
  useKeyPress(['backspace', 'delete'], () => {
    if (isActiveElementValid()) {
      dispatch(deleteSelectedComponentReducer())
    }
  })
  useKeyPress(['ctrl.c', 'meta.c'], () => {
    if (isActiveElementValid()) {
      dispatch(copySelectedComponentReducer())
    }
  })
  useKeyPress(['ctrl.v', 'meta.v'], () => {
    if (isActiveElementValid()) {
      dispatch(pasteCopiedComponentReducer())
    }
  })
  //选中上一个
  useKeyPress('uparrow', () => {
    if (isActiveElementValid()) {
      dispatch(selectPrevComponentReducer())
    }
  })
  //选中上一个
  useKeyPress('downarrow', () => {
    // e.preventDefault()
    if (isActiveElementValid()) {
      dispatch(selectNextComponentReducer())
    }
  })
  // 撤销
  useKeyPress(
    ['ctrl.z', 'meta.z'],
    () => {
      if (isActiveElementValid()) {
        if (past.length === 1) return
        dispatch(ActionCreators.jumpToPast(past.length - 1))
      }
    },
    {
      exactMatch: true //严格匹配
    }
  )
  useKeyPress(
    ['ctrl.y', 'meta.y'],
    () => {
      if (isActiveElementValid()) {
        dispatch(ActionCreators.redo())
      }
    },
    {
      exactMatch: true //严格匹配
    }
  )
}
export default useBindCanvasKeyPress
