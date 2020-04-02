import React from './../../node_modules/react';
import './../styles/App.css';
import './../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import FileUpload from '../containers/FileUpload';
import ConvertedText from '../containers/ConvertedText';
import CategorizedText from '../containers/CategorizedText';
import ConvertedAndCategorizedText from './../containers/ConvertedAndCategorizedText';
import ErrorHandler from  './ErrorHandler';

function Secondpage() {
  return (
    <div className='Secondpage' id='main'>
      <TestComponent>

      </TestComponent>
      <ErrorHandler>
      <FileUpload /> 
</ErrorHandler> 
      

    </div>
  );
}

class TestComponent extends React.Component{

  mouselog = () => console.log("yo");
  test(text){
    let arr = text.split(' ');

    let elements = arr.map(temp=> ( 
      <div onMouseEnter={this.mouselog} >{temp}</div>
      )
    )
      console.log(elements);
    return elements;
  }
  render(){
  let text = "Phoenix soon. Judy, this is Sean. Go ahead. Trauma. I got Ah, um I mean, you 10 minutes. Okay. 12 year old. Best dream History of white. I'm sorry. He was a pedestrian walking. Got hit by a vehicle. Okay, Okay. Multi system trauma. Okay. Thank you.";
    return(
      <div>
        {this.test(text)}
      </div>
    )
}
}
export default Secondpage;
