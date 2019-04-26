import classNames from 'classnames'
import PropTypes from 'prop-types'
import React, { useMemo } from 'react'
import { FormGroupStyledComponent } from '../styles/form'

import FormContext from './FormContext'

const propTypes = {
  // Currently set <div> as default element in <FormGroupStyledComponent>
  // And remove props `as` to assign element type
  as: PropTypes.elementType,

  /**
   * Sets `id` on `<FormControl>` and `htmlFor` on `<FormGroup.Label>`.
   */
  controlId: PropTypes.string,

  /**
   * The FormGroup `ref` will be forwarded to the underlying element.
   * Unless the FormGroup is rendered `as` a composite component,
   * it will be a DOM node, when resolved.
   *
   * @type {ReactRef}
   * @alias ref
   */
  _ref: PropTypes.any
}

const defaultProps = { as: 'div' }

const FormGroup = React.forwardRef(
  ({ className, children, controlId, as: Component, ...props }, ref) => {
    const context = useMemo(() => ({ controlId }), [controlId])

    return (
      <FormContext.Provider value={context}>
        <FormGroupStyledComponent
          {...props}
          ref={ref}
          className={classNames(className)}
        >
          {children}
        </FormGroupStyledComponent>
      </FormContext.Provider>
    )
  }
)

FormGroup.displayName = 'FormGroup'
FormGroup.propTypes = propTypes
FormGroup.defaultProps = defaultProps

export default FormGroup
