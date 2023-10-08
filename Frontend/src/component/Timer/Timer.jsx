import { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 60, 
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.tick, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  tick = () => {
    if (this.state.seconds > 0) {
      this.setState((prevState) => ({
        seconds: prevState.seconds - 1,
      }));
    } else {
      clearInterval(this.intervalId);
    }
  };

  render() {
    return (
      <div className="countdown-timer">
        <p>Time Remaining: {this.state.seconds} seconds</p>
      </div>
    );
  }
}

export default CountdownTimer;
