import React from 'react'

const LineSvg = ({className,width,height}) => {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 3 27" fill="none">
  <path d="M1.5 0L1.5 27" stroke="white" strokeOpacity="0.2" strokeWidth="2"/>
</svg>
    </div>
  )
}

export default LineSvg
