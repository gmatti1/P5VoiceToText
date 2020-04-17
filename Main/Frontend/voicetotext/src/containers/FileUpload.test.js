import React from "react";
import { shallow } from "enzyme";
import FileUpload from "./FileUpload";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });
beforeAll(() => {
    global.fetch = jest.fn();
    //window.fetch = jest.fn(); if running browser environment
  });
  let wrapper;

describe("FileUpload", () => {
    
    let mockSubmit;
    beforeEach(() => {
      mockSubmit = jest.fn();
      wrapper = shallow(<FileUpload submit={mockSubmit} />);
    });
   
    it("should match the snapshot", () => {
        expect(wrapper).toMatchSnapshot();
      });




describe("handleChange", () => {
    it("should call setState on title", () => {
        const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault,
      target: {
            
        value: "test"

    }
    };
      
      const expected = {
        isFileUploaded: null,
      title: '',
      textCategorized: [],
     
      loading: false,
      filename: '',
      
      textdone: false,
      disabled: false,
      istextupdated: false,
      targetElement: null,
      stats: [],
        convertedText:"test"
      };
      wrapper.instance().handleChange(mockEvent);
      
      expect(wrapper.state()).toEqual(expected);
    });
   
  });
  
})
  