/**
 * validate one input when changing or blurring
 * @param event
 */

export function validate(event) {
  let newState = {
    isValid: true
  }

  newState[event.target.name] = event.target.value

  let field = event.target.getAttribute('name')
  let val = event.target.value
  let className = event.target.className

  /**
   * add error class
   */
  function addErrorClass() {
    if (className.indexOf('error') === -1) {
      event.target.className = className + ' error'
    }
  }

  /**
   * remove error class
   */
  function removeErrorClass() {
    if (className.indexOf('error') !== -1) {
      event.target.className = className.substr(0, className.length - 6)
    }
  }

  if (event.target.hasAttribute('required')) {
    let key = field + '_$error_required'
    if (val === '') {
      newState[key] = `The ${field} input is required`
      addErrorClass()
    } else {
      delete this.state[key]
      removeErrorClass()
    }
  }

  if (event.target.hasAttribute('minLength')) {
    let len = event.target.getAttribute('minLength')
    let key = field + '_$error_minLength'
    if (val.length < len) {
      newState[key] = `The ${field} input is less than ${len} chars`
      addErrorClass()
    } else {
      delete this.state[key]
      removeErrorClass()
    }
  }

  if (event.target.hasAttribute('pattern')) {
    let regx = new RegExp(event.target.getAttribute('pattern'))
    let key = field + '_$error_pattern'
    if (regx.test(val)) {
      delete this.state[key]
      removeErrorClass()
    } else {
      newState[key] = `The ${field} is valid`
      addErrorClass()
    }
  }
  this.setState(newState)
}

/**
 * validate All inputs when submitting
 * @param event
 * @returns {boolean}
 */
export function validateAll(event) {
  event.preventDefault()
  let controls = event.target.querySelectorAll('.form-control')
  let inputs = Array.from(controls).filter(input => {
    return input.hasAttribute('required')
      || input.hasAttribute('minLength')
      || input.hasAttribute('pattern');
  })
  inputs.forEach(input => {
    input.dispatchEvent(new Event('blur'))
  })
  return inputs.every(input => input.className.indexOf('error') === -1)
}