import React, { Component } from 'react';
import { Input } from 'semantic-ui-react';

import SelectorList from './SelectList';

import '../../styles/Selector.css';
import './selector-client';

export default class Selector extends Component {
  render() {
    return (
      <div class="selector">
        <Input placeholder="منبع" type="text" className="rtl" />
        <SelectorList />
      </div>
    );
  }
}
