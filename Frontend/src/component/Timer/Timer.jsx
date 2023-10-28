import { Component } from 'react';

class CountdownTimer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seconds: 0,
      minutes: props.duration % 60,
      hours: Math.floor(props.duration/60),
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
    } else if (this.state.seconds === 0 && this.state.minutes > 0) {
        this.setState((prevState) => ({
        minutes: prevState.minutes - 1,
        seconds: prevState.seconds + 59,
      }));

    } else if (this.state.seconds === 0 && this.state.minutes === 0 && this.state.hours >0) {
        this.setState((prevState) => ({
        hours: prevState.hours - 1,
        minutes: prevState.minutes + 59,
        seconds: prevState.seconds + 59,
      }));

    } else {
        clearInterval(this.intervalId);
    }
  };

  render() {
    return (
      <div className="countdown-timer">
        <p hidden={this.props.hideTitle}>Time Remaining:</p>
        <p>{this.state.hours} hrs : {this.state.minutes} mins : {this.state.seconds} secs</p>
      </div>
    );
  }
}

export default CountdownTimer;
