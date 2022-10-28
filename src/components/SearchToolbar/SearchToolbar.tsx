import React from 'react'

import { GridToolbarProps, GridToolbarContainer, GridToolbarQuickFilter } from '@mui/x-data-grid'

function SearchToolBar(props: GridToolbarProps) {
  return (
    <GridToolbarContainer {...props}>
      <GridToolbarQuickFilter label="Filter by name" placeholder="Enter name here" />
    </GridToolbarContainer>
  )
}

export default SearchToolBar
