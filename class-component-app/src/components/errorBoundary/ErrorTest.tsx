import { Component } from 'react';
import './ErrorTest.css';

interface ErrorTestState {
  hasError: boolean;
}

export class ErrorTest extends Component<object, ErrorTestState> {
  state: ErrorTestState = {
    hasError: false,
  };


  handleError = () => {
    this.setState({
      hasError: true,
    });
  };

  render() {
    if (this.state.hasError) throw new Error('Test Error');
    return (
      <button onClick={this.handleError} className="error-test">
        Test Error
      </button>
    );
  }
}
