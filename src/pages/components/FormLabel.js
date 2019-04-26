import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useContext } from 'react'
import FormContext from './FormContext'

const propTypes = {
  /**
   * @default 'form-label'
   */
  bsPrefix: PropTypes.string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  htmlFor: PropTypes.string,

  /**
   * The FormLabel `ref` will be forwarded to the underlying element.
   * Unless the FormLabel is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,

  /**
   * Hides the label visually while still allowing it to be
   * read by assistive technologies.
   */
  srOnly: PropTypes.bool
}

const defaultProps = { srOnly: false }

const FormLabel = React.forwardRef(({ srOnly, className, htmlFor, ...props }, ref) => {
  const { controlId } = useContext(FormContext)

  const classes = classNames(className, srOnly && 'sr-only')

  if (controlId == null || !htmlFor) {
    console.warn('`controlId` is ignored on `<FormLabel>` when `htmlFor` is specified.')
  }
  htmlFor = htmlFor || controlId

  return (
    // eslint-disable-next-line jsx-a11y/label-has-for, jsx-a11y/label-has-associated-control
    <label ref={ref} className={classes} htmlFor={htmlFor} {...props} />
  )
})

FormLabel.displayName = 'FormLabel'
FormLabel.propTypes = propTypes
FormLabel.defaultProps = defaultProps

export default FormLabel
