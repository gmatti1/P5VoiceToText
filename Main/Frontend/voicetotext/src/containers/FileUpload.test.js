import React from "react";
import { shallow } from "enzyme";
import FileUpload from "./FileUpload";
import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({ adapter: new Adapter() });

describe("FileUpload", () => {
    let wrapper;
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
  
  
  it("should call preventDefault", () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault
    };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockPreventDefault).toHaveBeenCalled();
  });
  it("should return if submitActive is false", () => {
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault
    };
    
    const spy = jest.spyOn(wrapper.instance(), "handleSubmit");
    wrapper.instance().forceUpdate();
    
    wrapper.instance().handleSubmit(mockEvent);
    expect(spy).toReturn();
  });
  it("should call submit with the correct params", () => {
    wrapper.setState({
        isFileUploaded: null,
        title: '',
        textCategorized: [],
        loading: false,
        filename: '',
        convertedText: '',
        textdone: false,
        disabled: false,
        istextupdated: false,
        targetElement: null,
        stats: [],
    });
    const expected = {
      title: "test title",
      description: "test description"
    };
    const mockPreventDefault = jest.fn();
    const mockEvent = {
      preventDefault: mockPreventDefault
    };
    wrapper.instance().handleSubmit(mockEvent);
    expect(mockSubmit).toHaveBeenCalledWith(expected);
  });
})
  