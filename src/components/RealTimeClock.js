import React from "react";

class RealTimeClock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { time: null };
    this.readTime = this.readTime.bind(this);
  }
  componentDidMount() {
    this.readTime();
  }
  componentWillUnmount() {
    window.clearInterval(this.intervalId);
  }
  readTime() {
    this.intervalId = window.setInterval(() => {
      const now = new Date().toLocaleTimeString();
      this.setState({
        time: now
      });
    }, 1000);
  }
  render() {
    const { time } = this.state;
    return <h1>{time ? time : ""}</h1>;
  }
}

export default RealTimeClock;
