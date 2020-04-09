import React from 'react';
import { HistModal } from '../containers/HistModal';
//import TriggerButton from '../TriggerButton';
import HistTriggerButton from '../containers/HistTriggerButton';



class HistPopUp extends React.Component {
	
state = { isShown: false };

showModal = () => {
  this.setState({ isShown: true }, () => {
  this.closeButton.focus();
});

this.toggleScrollLock();
};

closeModal = () => {
  this.setState({ isShown: false });
  this.TriggerButton.focus();
  this.toggleScrollLock();
};

onKeyDown = (event) => {
if (event.keyCode === 27) {
  this.closeModal();
  }
 };
 
onClickOutside = (event) => {
 if (this.modal && this.modal.contains(event.target)) return;
 this.closeModal();
 };
 
toggleScrollLock = () => {
 document.querySelector('html').classList.toggle('histscroll-lock');
};

render() {
	return (
		<React.Fragment>
		<HistTriggerButton
			showModal={this.showModal}
			buttonRef={(n) => (this.TriggerButton = n)}
			triggerText={this.props.triggerText}
		/>
		{this.state.isShown ? (
		<HistModal
			  onSubmit={this.props.onSubmit}
            modalRef={(n) => (this.modal = n)}
            buttonRef={(n) => (this.closeButton = n)}
            closeModal={this.closeModal}
            onKeyDown={this.onKeyDown}
            onClickOutside={this.onClickOutside}
           invalue={this.props.invalue}
           invalueother={this.props.invalueother}
		   handleChangeTeatarea={this.props.handleChangeTeatarea}
		/>
		) : null}
		</React.Fragment>
  );
 }
}
export default HistPopUp;