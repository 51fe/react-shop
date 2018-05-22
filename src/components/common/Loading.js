import React from 'react'

import '../../assets/less/loading.less'

const Loading = () => (
  <div className="overlay">
    <div className="ball-pulse">
      <div></div>
      <div></div>
      <div></div>
    </div>
  </div>
)

export default Loading