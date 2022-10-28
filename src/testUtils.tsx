/* eslint-disable import/export */
import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'
import { Provider } from 'react-redux'

import store from '@/store'

afterEach(() => {
  cleanup()
})

// Provide Redux store for renders
const customRender = (ui: React.ReactElement, options = {}) =>
  render(ui, {
    wrapper: ({ children }) => <Provider store={store}>{children}</Provider>,
    ...options,
  })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'

export { customRender as render }
