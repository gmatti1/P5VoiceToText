import React, { Component } from 'react';
import './../styles/App.css';

class ConvertedAndCategorizedText extends Component {
  render() {
    return (
      <div className='wrapper'>
        <div className='convertedText'>Converted Text
          <div style={{fontSize: '0.5em', textAlign: 'left'}}>Lorem ipsum dolor sit amet, ius an error scripta. No quidam omnesque sea, habemus moderatius eos ad. No his consul admodum concludaturque, saperet indoctum mel an, has laoreet suscipiantur te. Cibo falli debitis pro no, sed minim novum eu, id stet postea meliore eos. Te vis wisi decore, in duo corpora vivendum.
            Errem assueverit mei ei. Omnium tamquam per ex, mutat salutatus ei est. Elit lucilius ad mel, detracto pertinax scriptorem te sed. Cu eros mnesarchum voluptatum eos, nec eu fugit choro, assum dolor ex nec. Wisi paulo persecuti ex ius, eum et sint aperiri partiendo.
        </div>
        </div>
        <div className='categorizedText'>Categorized Text
        <div style={{fontSize: '0.5em', textAlign: 'left'}}>
                  Info:  6 y/o female​<br/>
                  Mechanism:  GSW​<br/>
                  Injuries:  Evisceration of bowel​<br/>
                  Signs (VS, GCS):  Unable to obtain BP/HR 166 = shock! GCS 3 (is important (especially in blunt trauma))​<br/>
                  Treatment and Trends:  RSI, on Vent (100% Saturation)​<br/>
                  Allergies, Meds, Background, Other – [often all negative in children]
        </div>
        </div>
      </div>
    );
  }
}

export default ConvertedAndCategorizedText;
