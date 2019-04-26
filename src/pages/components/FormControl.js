import classNames from 'classnames'
import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import Feedback from './Feedback'
import FormContext from './FormContext'
import { InputStyledComponent } from '../styles/form'

const propTypes = {
  /**
   * The FormControl `ref` will be forwarded to the underlying input element,
   * which means unless `as` is a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any,
  /**
   * Input size variants
   *
   * @type {('sm'|'lg')}
   */
  size: PropTypes.string,

  /**
   * Render the input as plain text. Generally used along side `readOnly`.
   */
  plaintext: PropTypes.bool,

  /** Make the control readonly */
  readOnly: PropTypes.bool,

  /** Make the control disabled */
  disabled: PropTypes.bool,

  /**
   * The `value` attribute of underlying input
   *
   * @controllable onChange
   * */
  value: PropTypes.string,

  /** A callback fired when the `value` prop changes */
  onChange: PropTypes.func,

  /**
   * The HTML input `type`, default to `text`
   * Since React give `value` attr to <textarea>
   * (ref:https://reactjs.org/docs/forms.html#the-textarea-tag)
   * and enlightend by the debate on SO:
   * https://stackoverflow.com/questions/5637326/why-isnt-textarea-an-inputtype-textarea
   * We treat <textarea> as a type of <input> to simplified form elements
   */
  type: PropTypes.string,

  /**
   * Uses `controlId` from `<FormGroup>` if not explicitly specified.
   */
  id: PropTypes.string,

  /** Add "valid" validation styles to the control */
  isValid: PropTypes.bool,

  /** Add "invalid" validation styles to the control and accompanying label */
  isInvalid: PropTypes.bool
}

const defaultProps = { type: 'text' }

const FormControl = React.forwardRef(
  (
    {
      type,
      size,
      id,
      className,
      isValid,
      isInvalid,
      plaintext,
      readOnly,
      ...props
    },
    ref
  ) => {
    const { controlId } = useContext(FormContext)

    if (controlId == null || !id) {
      console.warn(
        '`controlId` is ignored on `<FormControl>` when `id` is specified.'
      )
    }

    return (
      <InputStyledComponent
        {...props}
        type={type}
        ref={ref}
        readOnly={readOnly}
        id={id || controlId}
        className={classNames(
          className,
          isValid && 'is-valid',
          isInvalid && 'is-invalid'
        )}
      />
    )
  }
)

FormControl.displayName = 'FormControl'
FormControl.propTypes = propTypes
FormControl.defaultProps = defaultProps

FormControl.Feedback = Feedback

export default FormControl
