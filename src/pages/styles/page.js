import styled from 'styled-components'
import { gridGap, gridColumnGap, gridColumn, gridTemplateColumns } from 'styled-system'

export const page = {
  fontSizes: [12, 14, 16, 24, 32, 48, 64, 96, 128],
  space: [
    // margin and padding
    0,
    5,
    10
  ]
}

export const PageContainer = styled.div`
  ${gridGap}
  ${gridColumnGap}
  ${gridColumn}
  ${gridTemplateColumns}
`

PageContainer.defaultProps = {
  gridGap: ['2px', '4px', '8px'],
  gridColumnGap: ['2px', '4px', '8px'],
  gridColumn: 2 / 3,
  gridTemplateColumns: '1fr 1fr 1fr'
}
