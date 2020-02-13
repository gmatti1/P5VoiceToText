import React, { Component } from 'react';
import './../styles/App.css';

class ConvertedAndCategorizedText extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='convertedText'>Converted Text</div>
        <div className='categorizedText'>Categorized Text</div>
      </div>
    );
  }
}

export default ConvertedAndCategorizedText;
