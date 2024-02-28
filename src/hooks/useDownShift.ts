import { useState, useEffect } from 'react'

const useDownShift = () => {
  const [downShift, setDownShift] = useState(false)
  const handleKeydown = (e: KeyboardEvent) => {
    // console.log('keydown', e)
    if (e.key === 'Shift') {
      setDownShift(true)
    }
  }
  const handleKeyup = (e: KeyboardEvent) => {
    //console.log('handleKeyup', e)
    if (e.key === 'Shift') {
      setDownShift(false)
    }
  }
  useEffect(() => {
    // window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keydown', handleKeydown)
    window.addEventListener('keyup', handleKeyup)
    return () => {
      window.removeEventListener('keypress', handleKeydown)
      window.removeEventListener('keyup', handleKeyup)
    }
  }, [])
  return downShift
}
export default useDownShift
