import React, { useEffect, useState } from 'react'
import { useWindowScroll } from 'react-use'

const ScrollToTopButton = () => {
  const { y: pageYOffset } = useWindowScroll()
  const [visible, setVisibility] = useState(false)

  // Display scroll to top button when scroll to Y>600
  useEffect(() => {
    if (pageYOffset > 600) {
      setVisibility(true)
    } else {
      setVisibility(false)
    }
  }, [pageYOffset])

  const scrollToTop = () =>
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })

  if (!visible) {
    return false
  }

  return (
    <div onClick={scrollToTop}>
      <img
        src="/images/top.png"
        alt="scrollToTop"
        className="shadow-none w-12 h-12 fixed z-20 big-tablet:bottom-8 right-4 small-phone:bottom-16 cursor-pointer animate-bounce opacity-70 hover:opacity-100 ease-in-out duration-300"
      />
    </div>
  )
}

export default ScrollToTopButton
