import React, { forwardRef, useMemo } from "react"

interface SelectOption {
  label: any;
  value: any;
}

type SelectProps = {
  options?: SelectOption[]
  className?: string
} & React.SelectHTMLAttributes<HTMLSelectElement>

const Select = forwardRef<HTMLSelectElement, SelectProps>(({
  options = [],
  className = '',  
  ...restProps
}, ref) => {
  const innerClassName = useMemo(() => {
    const cn = "block h-10 rounded-md px-3 ring-1 ring-inset ring-gray-300 cursor-pointer focus-visible:outline-none hover:ring-blue-400 appearance-none"

    return `${cn} ${className}`
  }, [className])

  return <select 
    className={innerClassName} 
    {...restProps} 
    ref={ref}
  >
    {options?.map(option => (
      <option value={option.value} key={option.value}>
        {option.label}
      </option>
    ))}
  </select>
})

export default Select