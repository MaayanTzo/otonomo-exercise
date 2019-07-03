import cn from 'classnames'
import React from 'react'
import './Button.scss'

export default function Button({ className, ...props }) {
  return (
    <button
      {...props}
      onClick={props.setVin}
      className={cn(className, 'button')}
    />
  )
}
