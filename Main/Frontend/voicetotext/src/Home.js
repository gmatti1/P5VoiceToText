import React, { Component } from 'react';
import './index.css';


class Home extends Component {

    constructor(props) {
    super(props);

    this.state = {
      textConverted: '',
      textCategorized: '',
    };
  }

    componentDidMount(){
        fetch('/convertVoice').then(response => 
            response.json().then(data => {
                this.setState({textConverted:data});
                console.log(this.state.textConverted)
            })
        );
        fetch('/categorizeText').then(response => 
            response.json().then(data => {
                this.setState({textCategorized:data});
                console.log(this.state.textCategorized)
            })
        );
    }

    render() {

        return (
            <div className="Home">
               
                <h1>
                {this.state.textConverted}
                </h1>
                <h1>
                {this.state.textCategorized}
                </h1>
            </div>
        );
    }
}

export default Home;