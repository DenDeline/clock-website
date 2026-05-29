'use client'
import { styled, Typography } from '@mui/material'
import type { CSSProperties, ReactNode, Ref } from 'react'

interface PageBlockInfoProps {
  textAlign?: CSSProperties['textAlign']
  ref?: Ref<HTMLDivElement>
  children?: ReactNode
}

const PageBlockInfoRoot = styled('div', {
  slot: 'Root',
  name: 'PageBlockInfoRoot',
})(({ theme }) => ({
  position: 'relative',
  marginBottom: 24,
  [theme.breakpoints.up('sm')]: {
    marginBottom: 40,
  },
  [theme.breakpoints.up('lg')]: {
    marginBottom: 48,
  },
}))

function PageBlockInfo({ children, textAlign, ref }: PageBlockInfoProps) {
  return (
    <PageBlockInfoRoot ref={ref} sx={{ textAlign }}>
      <Typography
        variant={'h4'}
        sx={{
          fontWeight: 'bold',
          textAlign: { xs: 'center', sm: 'inherit' },
        }}
      >
        {children}
      </Typography>
    </PageBlockInfoRoot>
  )
}

export default PageBlockInfo
