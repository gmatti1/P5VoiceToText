import React, { Component } from './../../node_modules/react';
import Table from 'react-bootstrap/Table';
import './../../node_modules/ag-grid-community/dist/styles/ag-grid.css';
import './../../node_modules/ag-grid-community/dist/styles/ag-theme-balham.css';
import './../styles/index.css';

class CategorizedText extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    // var identification_keywords = "";
    // if(this.props.textCategorized.identification.length >= 1)
    //   identification_keywords = this.props.textCategorized.identification[0];
    // for(var i = 1; i< this.props.textCategorized.identification.length; i++)
    //   identification_keywords+= ', ' + this.props.textCategorized.identification[i];

    // var mechanism_keywords = "";
    // if(this.props.textCategorized.mechanism.length >= 1)
    //   mechanism_keywords = this.props.textCategorized.mechanism[0];
    // for(var i = 1; i< this.props.textCategorized.mechanism.length; i++)
    //   mechanism_keywords+= ', ' + this.props.textCategorized.mechanism[i];

    // var injury_keywords = "";
    // if(this.props.textCategorized.injury.length >= 1)
    //   injury_keywords = this.props.textCategorized.injury[0];
    // for(var i = 1; i< this.props.textCategorized.injury.length; i++)
    //   injury_keywords+= ', ' + this.props.textCategorized.injury[i];

    // var signs_keywords = "";
    // if(this.props.textCategorized.signs.length >= 1)
    //   signs_keywords = this.props.textCategorized.signs[0];
    // for(var i = 1; i< this.props.textCategorized.signs.length; i++)
    //   signs_keywords+= ', ' + this.props.textCategorized.signs[i];

    // var treatment_keywords = "";
    // if(this.props.textCategorized.treatment.length >= 1)
    //   treatment_keywords = this.props.textCategorized.treatment[0];
    // for(var i = 1; i< this.props.textCategorized.treatment.length; i++)
    //   treatment_keywords+= ', ' + this.props.textCategorized.treatment[i];

    // var allergy_keywords = "";
    // if(this.props.textCategorized.allergy.length >= 1)
    //   allergy_keywords = this.props.textCategorized.allergy[0];
    // for(var i = 1; i< this.props.textCategorized.allergy.length; i++)
    //   allergy_keywords+= ', ' + this.props.textCategorized.allergy[i];

    // var medication_keywords = "";
    // if(this.props.textCategorized.medication.length >= 1)
    //   medication_keywords = this.props.textCategorized.medication[0];
    // for(var i = 1; i< this.props.textCategorized.medication.length; i++)
    //   medication_keywords+= ', ' + this.props.textCategorized.medication[i];

    // var background_keywords = "";
    // if(this.props.textCategorized.background.length >= 1)
    //   background_keywords = this.props.textCategorized.background[0];
    // for(var i = 1; i< this.props.textCategorized.background.length; i++)
    //   background_keywords+= ', ' + this.props.textCategorized.background[i];

    // var other_keywords = "";
    // if(this.props.textCategorized.other.length >= 1)
    //   other_keywords = this.props.textCategorized.other[0];
    // for(var i = 1; i< this.props.textCategorized.other.length; i++)
    //   other_keywords+= ', ' + this.props.textCategorized.other[i];    

    if (!this.props.loading) {
      return null;
    } else {
      return (
        <div className='Tablesize'>
          <Table striped bordered hover size='sm' responsive id='TableText'>
            <thead>
              <tr>
                <th>Category</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Identification</td>
                <td>{this.props.textCategorized.identification}</td>
              </tr>
              <tr>
                <td>Mechanism</td>
                <td>{this.props.textCategorized.mechanism}</td>
              </tr>
              <tr>
                <td>Injuries</td>
                <td>{this.props.textCategorized.injury}</td>
              </tr>
              <tr>
                <td>Signs</td>
                <td colSpan='2'>{this.props.textCategorized.signs}</td>
              </tr>
              <tr>
                <td>Treatment</td>
                <td>{this.props.textCategorized.treatment}</td>
              </tr>
              <tr>
                <td>Allergies</td>
                <td>{this.props.textCategorized.allergy}</td>
              </tr>
              <tr>
                <td>Medications</td>
                <td>{this.props.textCategorized.medication}</td>
              </tr>
              <tr>
                <td>Background</td>
                <td>{this.props.textCategorized.background}</td>
              </tr>
              <tr>
                <td>Other Info</td>
                <td>{this.props.textCategorized.other}</td>
              </tr>
            </tbody>
          </Table>
        </div>
      );
    }
  }
}
export default CategorizedText;