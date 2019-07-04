import React from 'react'
import cn from 'classnames'

import './Input.scss'

function Input({ className, ...props }) {
  return (
    <input
      type="text"
      ref={props.newVin}
      onChange={props.getVin}
      className={cn('input', className)}
    />
  )
}

export default Input
