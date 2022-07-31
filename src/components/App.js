import React from 'react'

import EditableTimebox from './EditableTimebox'
import TimeboxList from './TimeboxList'
import Error from './Error'

function App() {
  return (
    <div className="App" id="app">
      <Error message="Coś nie działa w całej appce :(">
        <TimeboxList />
        <Error message="Coś nie działa w EditableTimebox :(">
          <EditableTimebox />
        </Error>
      </Error>
    </div>
  )
}

export default App
