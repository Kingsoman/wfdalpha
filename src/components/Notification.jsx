import React, {useState, forwardRef, useImperativeHandle } from 'react'
import { CheckCircle, XCircle } from 'phosphor-react'

function Notification(props, ref) {
    // const { notification, close } = props
    const [notification, setNotification] = useState({
        type: 'success',
        message: '',
        show: false,
    })

    useImperativeHandle(ref, () => ({
      hideNotification() {
        setNotification({
            message: notification.message,
            type: notification.type,
            show: false,
        })
      },
      showNotification(message, type, duration) {
        setNotification({
            message: message,
            type: type,
            show: true,
        })

        setTimeout(() => {
            setNotification({
            message: message,
            type: type,
            show: false,
            })
        }, duration)
      }
    }), []);

    function hideNotification() {
      setNotification({
          message: notification.message,
          type: notification.type,
          show: false,
      })
    }
    
    let className = notification.show ? 'show' : ''
    className += notification.type === 'success' ? ' success' : ' error'

    return (
        <div onClick={hideNotification} className={`notification ${className}`}>
            <p>
                {notification.type === 'success' && <CheckCircle size={24} />}
                {notification.type === 'error' && <XCircle size={24} />}
                {notification.message}
            </p>
        </div>
    )
}

export default forwardRef(Notification)