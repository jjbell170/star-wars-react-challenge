import React from 'react'
import PropTypes from 'prop-types'
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  List,
  ListItemText,
  Typography,
} from '@mui/material'

import { Person } from '@/src/api/StarWarsAPI'

type PeopleDialogProps = {
  open: boolean
  selectedPerson: Person
  handleClose: React.MouseEventHandler<HTMLButtonElement>
}

function PeopleDialog({ open, selectedPerson, handleClose }: PeopleDialogProps) {
  return (
    <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xs">
      <DialogTitle align="center">{selectedPerson.name}</DialogTitle>
      <DialogContent>
        <Typography variant="body1" fontWeight="bold" align="center">
          Appeared in
        </Typography>
        <List>
          {selectedPerson.films.map((film: string) => (
            <ListItemText
              key={film}
              primaryTypographyProps={{
                variant: 'body2',
                fontWeight: 'medium',
                align: 'center',
              }}
            >
              {film}
            </ListItemText>
          ))}
        </List>

        <Typography variant="body1" fontWeight="bold" align="center">
          Home Planet
        </Typography>

        <Typography variant="body2" fontWeight="medium" align="center" gutterBottom>
          {selectedPerson.homeworld}
        </Typography>

        <Typography variant="body1" fontWeight="bold" align="center">
          Year of Birth
        </Typography>

        <Typography variant="body2" fontWeight="medium" align="center" gutterBottom>
          {selectedPerson.birth_year}
        </Typography>

        <Typography variant="body1" fontWeight="bold" align="center">
          Eye Colour
        </Typography>

        <Typography variant="body2" fontWeight="medium" align="center">
          {selectedPerson.eye_color}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus fullWidth>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  )
}
PeopleDialog.propTypes = {
  open: PropTypes.bool,
  selectedPerson: PropTypes.shape({
    name: PropTypes.string,
    films: PropTypes.arrayOf(PropTypes.string),
    homeworld: PropTypes.string,
    birth_year: PropTypes.string,
    eye_color: PropTypes.string,
  }),
  handleClose: PropTypes.func.isRequired,
}
PeopleDialog.defaultProps = {
  open: false,
  selectedPerson: {
    name: '',
    films: [],
    homeworld: '',
    birth_year: '',
    eye_color: '',
  },
}
export default PeopleDialog
