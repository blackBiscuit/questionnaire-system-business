import { FC,useEffect } from 'react'
import useLoadQuestionData from '../../hooks/useLoadQuestionData'
export default (() => {
  // const { id = '' } = useParams()
  const { questionData } = useLoadQuestionData()
  useEffect(()=>{
    console.log(questionData)
  },[questionData])
  return <div>edit</div>
}) as FC
