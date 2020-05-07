import { useEffect, useState } from 'react'

export default () => {
  const [height, setHeight] = useState(window.innerHeight)

  useEffect(() => {
    const onResize = () => {
      setHeight(window.innerHeight)
    }

    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('resize', onResize)
    }
  })

  return height + 'px'
}
