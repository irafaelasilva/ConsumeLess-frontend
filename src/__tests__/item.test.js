import React from 'react';
import { expect } from 'chai';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Items from '../components/Items';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });


  describe('Items component', () => {
    it('renders the <Items /> components', () => {
      const wrapper = shallow(<Items />);
      expect(wrapper.find('div')).to.have.lengthOf(2)
    });

  });
