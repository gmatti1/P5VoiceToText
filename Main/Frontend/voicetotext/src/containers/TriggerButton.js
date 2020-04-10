import React from 'react';
const Trigger = ({ triggerText, buttonRef, showModal }) => {
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