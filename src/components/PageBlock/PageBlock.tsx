'use client'

import { Container, styled, type ContainerProps } from '@mui/material'
import type { SxProps, Theme } from '@mui/material/styles'

interface PageBlockProps {
  maxWidth?: ContainerProps['maxWidth']
  ref?: React.Ref<HTMLDivElement>
  children?: React.ReactNode
  sx?: SxProps<Theme>
}

const PageBlockRoot = styled('div', {
  slot: 'Root',
  name: 'PageBlockRoot',
})(({ theme }) => ({
  position: 'relative',
  marginTop: 64,
  [theme.breakpoints.up('sm')]: {
    marginTop: 104,
  },
  [theme.breakpoints.up('lg')]: {
    marginTop: 120,
  },
}))

function PageBlock({ children, maxWidth, ref, sx }: PageBlockProps) {
  return (
    <PageBlockRoot ref={ref} sx={sx}>
      <Container maxWidth={maxWidth}>{children}</Container>
    </PageBlockRoot>
  )
}

export default PageBlock
