import React from 'react'
import styled from 'styled-components'
import { space, display, width, fontSize, color } from 'styled-system'
import { gray200, gray600 } from './color'

export const FormGroupStyledComponent = styled.div`
  ${space}
`

FormGroupStyledComponent.defaultProps = { mb: [0, 15, 30] }

// In-line css must end with semi,
// and the order between styled function variable doesn't matter
// export const Input = styled.input`
const el = React.createElement
el.displayName = 'InputBase'
const InputBase = ({ children, ...props }) => {
  console.log('Input children', children)
  console.log('Input props', props)
  let inputEl = 'input'
  inputEl = props.type === 'textarea' ? props.type : inputEl
  return el(inputEl, props, children)
}

export const InputStyledComponent = styled(InputBase)`
  ${display}
  ${width}
  // Change height based on props
  height: ${props => (props.type === 'textarea' ? 'auto' : '34px')};
  ${space}
  ${fontSize}
  ${color}
  line-height: 1.42857143;
  background-image: none;
  border-radius: 4px;
  // Disabled and read-only inputs
  //
  // HTML5 says that controls under a fieldset > legend:first-child won't be
  // disabled if the fieldset is disabled. Due to implementation difficulty, we
  // don't honor that edge case; we style them as disabled anyway.
  &:disabled,
  &[readonly] {
    cursor: not-allowed;
    background-color: ${gray200};
    // iOS fix for unreadable disabled content; see https://github.com/twbs/bootstrap/issues/11655.
    opacity: 1;
  }
  &::placeholder {
    font-weight: bold;
    color: ${gray600};
    // Override Firefox's unusual default opacity; see https://github.com/twbs/bootstrap/pull/11526.
    opacity: .7;
  }
  border: 1px solid #ccc;
  box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075);
  transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  &:focus {
    color: #495057;
    border-color: #66afe9;
    outline: 0;
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075), 0 0 8px rgba(102, 175, 233, 0.6);
  }
`

InputStyledComponent.defaultProps = {
  display: 'block',
  width: '100%',
  height: '34px',
  px: 12,
  py: 6,
  fontSize: '14px',
  color: '#555555',
  bg: '#fff'
}
