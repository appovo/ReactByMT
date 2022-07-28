import React from 'react'

import EditableTimebox from './EditableTimebox'
import RealTimeClock from './RealTimeCLock'
import TimeboxList from './TimeboxList'

function App() {
  return (
    <div className="App" id="app">
      <TimeboxList />
      <EditableTimebox />
      <RealTimeClock />
    </div>
  )
}

export default App
