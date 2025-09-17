import React from 'react'

const PlusSvg  = ({className,width,height}) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 19 18" fill="none">
  <circle cx="9.5" cy="9" r="9" fill="#140F25"/>
  <path d="M9.5 5L9.5 13M13.5 9L5.5 9" stroke="white" strokeWidth="2" strokeLinecap="round"/>
</svg>
    </div>
  )
}

export default PlusSvg 
