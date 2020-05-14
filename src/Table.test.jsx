import { act, render } from '@testing-library/react'
import DynamicTable from './Table'
import React from 'react'

describe(
  '<DynamicTable /> renders',
  () => {
    it(
      'renders without crashing',
      () => {
        // eslint-disable-next-line no-magic-numbers
        expect.assertions(1)
        act(() => {
          const component = render((
            <DynamicTable
              MDUrl="http://localhost:8121"
              object="users"
            />
          ))
          expect(component.getByText('ID')).toBeInstanceOf(HTMLDivElement)
        })
      }
    )
  }
)
