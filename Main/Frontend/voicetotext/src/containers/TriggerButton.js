import React from 'react';

/**
 * 
 * THis is the TriggerButton component. 
 * This is the button which opens the PopUp for adding new keyword for IMIST-AMBO.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

const Trigger = ({ 
	triggerText, 
	buttonRef, 
	showModal 
	}) => {
	return (
		<button
		className="btn btn-danger"
		id="calltopopup"
		ref={buttonRef}
		onClick={showModal}
		>
			{triggerText}
		</button>
	);
};
export default Trigger;