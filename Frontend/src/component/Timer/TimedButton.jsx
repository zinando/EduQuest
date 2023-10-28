import { Component } from 'react';
import {Button} from 'react-bootstrap';
import withRouter from './withRouter';
import { createSearchParams, Link, useNavigate } from 'react-router-dom';


class TimedButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      wait: props.wait,
      buttonText: "start",
      buttonTextStyle: 'normal',
    };
  }

  componentDidMount() {
    this.intervalId = setInterval(this.activateButton, this.props.timeRemaining * 1000);
     this.checkCurrentSituation();
     this.onSubmit();
  }

  componentWillUnmount() {
    clearInterval(this.intervalId);
  }

  activateButton = () => {
        this.setState({wait: false,});
        clearInterval(this.intervalId);
  };

  checkCurrentSituation = () => {
    if (this.props.timeRemaining === 0 ){
        this.setState({wait: false,});
        clearInterval(this.intervalId);
    } else if (this.props.timeRemaining < 0 ) {
        this.setState({buttonText:"expired!", buttonTextStyle: 'italic'});
        clearInterval(this.intervalId);
    }
  };

  onSubmit() {
    const { navigate } = this.props;
    // Navigate to Another Component
    console.log(navigate);
    navigate({pathname:"/exam_landing/exam",
                search: createSearchParams(this.props.data).toString()
                });
  }

  render() {
    //const { navigate } = this.props;
    return (
            <Button variant="success" className="custom-button" id="startButt" onClick={()=> this.onSubmit}
                disabled={false} style={{fontStyle: this.state.buttonTextStyle}}>
                {this.state.buttonText}
            </Button>
    );
  }
}

export default TimedButton;
