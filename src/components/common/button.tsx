import React, { forwardRef, useMemo } from "react"

type ButtonProps = {
  btnType?: "default" | "primary"
  disabled?: boolean
  className?: string
  children?: React.ReactNode
} & React.ButtonHTMLAttributes<HTMLButtonElement>

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  btnType = 'default',
  disabled = false,
  className = '',
  children,
  ...restProps
}, ref) => {
  const innerClassName = useMemo(() => {
    let cn = "min-w-10 h-10 px-3 rounded-md focus-visible:outline-none"

    if (btnType === 'primary') {
      cn += " text-white bg-blue-500"
      cn += disabled
        ? " text-gray-500 bg-gray-200 cursor-not-allowed"
        : " hover:bg-blue-600"
    } else {
      cn += " text-black ring-1 ring-inset ring-gray-300"
      cn += disabled
        ? " text-gray-500 bg-gray-200 cursor-not-allowed"
        : " hover:text-blue-600 hover:ring-blue-400"
    }

    return `${cn} ${className}`
  }, [btnType, disabled, className])

  return <button
    className={innerClassName}
    {...restProps}
    ref={ref}
  >
    {children}
  </button>
})

export default Button