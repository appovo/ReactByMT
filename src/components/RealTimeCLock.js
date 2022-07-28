import React from 'react'

class RealTimeClock extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hours: null, minutes: null, seconds: null }
    this.readTime = this.readTime.bind(this)
  }
  componentDidMount() {
    this.readTime()
  }
  componentWillUnmount() {
    window.clearInterval(this.intervalId)
  }
  readTime() {
    this.intervalId = window.setInterval(() => {
      const now = new Date()
      this.setState({
        hours: now.getHours(),
        minutes: now.getMinutes(),
        seconds: now.getSeconds(),
      })
    }, 1000)
  }
  render() {
    const { hours, minutes, seconds } = this.state
    return <h1>{hours ? hours + `:` + minutes + `:` + seconds : ''}</h1>
  }
}

export default RealTimeClock
