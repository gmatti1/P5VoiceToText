import React from 'react';
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