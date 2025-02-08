'use client'
import { styled, Typography, type TypographyProps } from '@mui/material'

interface PageBlockInfoProps {
  textAlign?: TypographyProps['textAlign']
  ref?: React.Ref<HTMLDivElement>
  children?: React.ReactNode
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
        sx={{ textAlign: { xs: 'center', sm: 'inherit' } }}
        variant={'h4'}
        fontWeight={'bold'}
      >
        {children}
      </Typography>
    </PageBlockInfoRoot>
  )
}

export default PageBlockInfo
