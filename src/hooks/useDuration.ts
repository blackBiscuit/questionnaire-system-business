import { useState, useEffect } from 'react'
const useDuration = (): [
  number,
  React.Dispatch<React.SetStateAction<number>>
] => {
  const [getEmailCodeDuration, setGetEmailCodeDuration] = useState(0)
  useEffect(() => {
    if (getEmailCodeDuration !== 0) {
      const duration = getEmailCodeDuration - 1
      setTimeout(() => {
        setGetEmailCodeDuration(duration)
      }, 1000)
    }
  }, [getEmailCodeDuration])
  return [getEmailCodeDuration, setGetEmailCodeDuration]
}
export default useDuration
