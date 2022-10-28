import React, { useEffect } from 'react'

import { Box, Typography } from '@mui/material'
import { DataGrid, DataGridProps, GridColDef } from '@mui/x-data-grid'

import StarWarsAPI, { Film, Person } from '@/api/StarWarsAPI'

import PeopleDialog from '@/components/PeopleDialog/PeopleDialog'
import SearchToolbar from '@/components/SearchToolbar/SearchToolbar'

// Define Grid Columns
const columns: GridColDef[] = [
  {
    field: 'name',
    headerName: 'Name',
    align: 'center',
    headerAlign: 'center',
    flex: 1,
  },
]

function App() {
  const [rows, setRows] = React.useState<Person[]>([])

  const [peopleDialogOpen, setPeopleDialogOpen] = React.useState(false)
  const [selectedPerson, setSelectedPerson] = React.useState<Person>()

  const getPeopleQuery = StarWarsAPI.endpoints.getPeople.useQuery()

  const [getPersonQuery] = StarWarsAPI.endpoints.getPerson.useLazyQuery()
  const [getFilmQuery] = StarWarsAPI.endpoints.getFilm.useLazyQuery()
  const [getPlanetQuery] = StarWarsAPI.endpoints.getPlanet.useLazyQuery()

  const handleOpen = () => setPeopleDialogOpen(true)
  const handleClose = () => setPeopleDialogOpen(false)

  // Load and transform returned data into rows
  useEffect(() => {
    if (getPeopleQuery.isSuccess) {
      setRows(
        getPeopleQuery.data
          .map((person, index) => ({ id: index, ...person })) // Add a unique ID to each row
          .sort((a, b) => a.name.localeCompare(b.name)), // Sort by name
      )
    }
  }, [getPeopleQuery.isSuccess, getPeopleQuery.data])

  // Load the data and open the Dialog for a given person when their row is clicked
  const handleRowClick: DataGridProps['onRowClick'] = async (props) => {
    // Get the data for a specific person
    const personData = await getPersonQuery(props.row.url.split('/people/')[1]).unwrap() // Unwrapping a query hook exposes the actual promise

    // We can also get the data straight from the row without an extra API call:
    // const personData: Person = props.row

    // Get all of their films in parallel
    const personFilms: Film[] = await Promise.all(
      personData.films.map((filmUrl) => getFilmQuery(filmUrl.split('/films/')[1]).unwrap()),
    )

    // Get their homeworld
    const personHomeworld = await getPlanetQuery(personData.homeworld.split('/planets/')[1]).unwrap()

    // Set the selected person with links replaced for the Dialog
    setSelectedPerson({
      ...personData,
      films: personFilms.map((film) => film.title),
      homeworld: personHomeworld.name,
    })

    // Open Dialog
    handleOpen()
  }

  return (
    <Box display="flex" flexDirection="column" sx={{ height: '98vh' }}>
      <Box
        component="img"
        sx={{
          height: 300,
          width: 250,
          alignSelf: 'center',
        }}
        src="/images/wicket.png"
      />
      <Typography variant="h3" fontWeight="bold" align="center">
        Star Wars Characters
      </Typography>
      <PeopleDialog open={peopleDialogOpen} selectedPerson={selectedPerson} handleClose={handleClose} />
      <DataGrid
        disableColumnSelector
        disableSelectionOnClick
        pagination
        autoPageSize
        columns={columns}
        rows={rows}
        loading={getPeopleQuery.isLoading}
        error={getPeopleQuery.error}
        onRowClick={handleRowClick}
        components={{
          Toolbar: SearchToolbar,
        }}
        initialState={{
          sorting: {
            sortModel: [{ field: 'name', sort: 'asc' }],
          },
        }}
      />
    </Box>
  )
}

export default App
