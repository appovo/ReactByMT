import React from 'react'

import EditableTimebox from './EditableTimebox'
import TimeboxList from './TimeboxList'
import ErrorBoundary from './ErrorBoundary'

function App() {
  return (
    <div className="App" id="app">
      <ErrorBoundary message="Coś nie działa w całej appce :(">
        <TimeboxList />
        <ErrorBoundary message="Coś nie działa w EditableTimebox :(">
          <EditableTimebox />
        </ErrorBoundary>
      </ErrorBoundary>
    </div>
  )
}

export default App
