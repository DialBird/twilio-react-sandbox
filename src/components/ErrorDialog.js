import React from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DialogContentText from '@material-ui/core/DialogContentText'

const ErrorDialog = ({ dismissError, error }) => {
  const { message, code } = error || {}

  const enhancedMessage = () => {
    switch (code) {
      case 20101: // Invalid token error
        return message + '. Please make sure you are using the correct credentials.'
      default:
        return message
    }
  }

  return (
    <Dialog open={error !== null} onClose={() => dismissError()} fullWidth={true} maxWidth="xs">
      <DialogTitle>ERROR</DialogTitle>
      <DialogContent>
        <DialogContentText>{enhancedMessage()}</DialogContentText>
        {code && (
          <pre>
            <code>Error Code: {code}</code>
          </pre>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => dismissError()} color="primary" autoFocus>
          OK
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ErrorDialog
