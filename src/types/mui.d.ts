import '@mui/material/Dialog'

declare module '@mui/material/Dialog' {
  interface DialogPaperSlotPropsOverrides {
    noValidate?: boolean
  }
}
