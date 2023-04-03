import React, { forwardRef, useMemo } from "react"

type InputProps = {
  className?: string
} & React.InputHTMLAttributes<HTMLInputElement>

const Input = forwardRef<HTMLInputElement, InputProps>(({
  className = '',
  ...restProps
}, ref) => {
  const innerClassName = useMemo(() => {
    const cn = "block w-full h-10 px-3 py-2 rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-blue-500 focus:h-10 focus-visible:outline-none"

    return `${cn} ${className}`
  }, [className])

  return <input 
    className={innerClassName} 
    {...restProps} 
    ref={ref}
  />
})

export default Input