import React from 'react'

export function ScrollStackItem({ children, className = '' }) {
  return (
    <div className="sticky top-28 flex justify-center pb-12">
      <div className={`w-full ${className}`}>
        {children}
      </div>
    </div>
  )
}

export default function ScrollStack({ children, className = '' }) {
  return (
    <div className={`relative flex flex-col ${className}`}>
      {React.Children.map(children, (child, i) => {
        if (!React.isValidElement(child)) return null
        return (
          // Height wrapper gives each card enough scroll runway to stick in place
          <div key={i} className="min-h-[70vh] w-full">
            {child}
          </div>
        )
      })}
    </div>
  )
}