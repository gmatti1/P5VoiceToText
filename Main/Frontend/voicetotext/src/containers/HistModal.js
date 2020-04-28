import React from 'react';
import ReactDOM from 'react-dom';
import HistForm from '../containers/HistForm';
import FocusTrap from 'focus-trap-react';

/**
 * This is the HistModal component for History tab.
 * It handles the modal PopUp close button and calls HistForm component.
 *
 * @version 1.0
 * @author [Yuti Desai] <yrdesai@asu.edu>
 * @copyright [Copyright 2020, P5VoiceToText] (https://github.com/gmatti1/P5VoiceToText)
 *
 */

export const HistModal = ({
	onClickOutside,
	onKeyDown,
	modalRef,
	buttonRef,
	closeModal,
	onSubmit,
	invalue,
	invalueother,
	handleChangeTeatarea
	}) => {
	return ReactDOM.createPortal(
		<FocusTrap>
			<aside
			tag="aside"
			role="dialog"
			tabIndex="-1"
			aria-modal="true"
			className="histmodal-cover"
			onClick={onClickOutside}
			onKeyDown={onKeyDown}
			>
				<div className="histmodal-area" ref={modalRef}>
					<button
					ref={buttonRef}
					aria-label="Close Modal"
					aria-labelledby="close-modal"
					className="_histmodal-close"
					onClick={closeModal}
					>
						<span id="histclose-modal" className="_histhide-visual">
							Close
						</span>
						<svg className="_histmodal-close-icon" viewBox="0 0 40 40">
							<path d="M 10,10 L 30,30 M 30,10 L 10,30" />
						</svg>
					</button>
					<div className="histmodal-body">
						<HistForm onSubmit={onSubmit} 
						invalue={invalue} 
						invalueother={invalueother} 
						handleChangeTeatarea={handleChangeTeatarea}
						/>
					</div>
				</div>
			</aside>
		</FocusTrap>,
		document.body
	);
};

export default HistModal;