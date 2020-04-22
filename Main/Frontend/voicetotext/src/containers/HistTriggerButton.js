import React from 'react';

/**
 * 
 * THis is the HistTriggerButton component. 
 * This is the button which opens the PopUp Modal on History tab.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

const Trigger = ({ triggerText, buttonRef, showModal }) => {

	return (
		<button
		className="btn btn-danger center"
		id="histcalltopopup"
		ref={buttonRef}
		onClick={showModal}
		>
			{triggerText}
		</button>
	);
};
export default Trigger;