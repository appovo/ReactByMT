import React from 'react'

import EditableTimebox from './EditableTimebox'
import RealTimeClock from './RealTimeCLock'
import TimeboxList from './TimeboxList'

function App() {
  return (
    <div className="App" id="app">
      <RealTimeClock />
      <TimeboxList />
      <EditableTimebox />
    </div>
  )
}

export default App
