import History from './History';
import React, { Component } from './../../node_modules/react';
import { shallow } from 'enzyme';
import Adapter from "enzyme-adapter-react-16";
import { configure } from "enzyme";
configure({ adapter: new Adapter() });
let wrapper;

describe('Hitsory', () => {
    
   
	describe('componentDidMount', () => {
		it('sets the state componentDidMount',() => {
			const some={
				invalue:'hgjhgjhghjgjhgj',
				invalueother:{
					"userId": 1,
					"id": 1,
					"title": "delectus aut autem",
					"completed": false
				},
				files: [],
				filename: '',
				selected: null,
				search: " "
			} 
		})
    })
})
