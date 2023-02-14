import React, { useState } from 'react'
import Toast from 'react-bootstrap/Toast'
import ToastContainer from 'react-bootstrap/ToastContainer'

function ToastMessage({ bg, title, body }) {
  const [show, setShow] = useState(true)
  return (
    <ToastContainer className="fixed z-50 small-phone:right-4 big-tablet:bottom-4 small-phone:bottom-32 text-white big-tablet:w-3/12 small-phone:w-5/12">
      <Toast
        bg={bg}
        onClose={() => setShow(false)}
        show={show}
        delay={2000}
        autohide
        className="bg-[#126E82] p-2 rounded-lg"
      >
        <Toast.Header
          className="flex justify-between border-b"
          closeButton={false}
        >
          <strong className="">{title}</strong>
          <small className="text-right">bây giờ</small>
        </Toast.Header>
        <Toast.Body>{body}</Toast.Body>
      </Toast>
    </ToastContainer>
  )
}

export default ToastMessage
