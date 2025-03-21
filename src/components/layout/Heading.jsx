import React from 'react'
import Box from './Box'

export const Heading = React.forwardRef((props, ref) => (
  <Box
    ref={ref}
    as="h3"
    variant="heading"
    {...props}
    __themeKey="text"
    __effectKey="text"
    __variantsKey="text"
    __css={{
      fontFamily: 'heading',
      lineHeight: 'heading',
    }}
  />
))
