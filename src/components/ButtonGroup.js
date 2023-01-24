import React from 'react'
import PropTypes from 'prop-types'

const ButtonGroup = ({ isEditing }) => {
  const goBack = () => {
    window.history.back()
  }

  return (
    <div className="form-group pull-right">
      <button type="button" className="button icon grey"
        onClick={goBack}>取消
      </button>
      <button type="submit" className="button icon">
        {isEditing ? '修改' : '添加'}
      </button>
    </div>
  )
}

ButtonGroup.propTypes = {
  isEditing: PropTypes.bool
}

export default ButtonGroup

