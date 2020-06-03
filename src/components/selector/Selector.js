import React, { Component } from 'react';
import { Input, Icon } from 'semantic-ui-react';

import SelectorList from './SelectList';

import '../../styles/Selector.css';
import './selector-client';

export default class Selector extends Component {
  render() {
    let selected_lables = '';
    if (this.props.multiple) {
      let labels_list = this.props.items.map(function (item, index) {
        return <li data-id={index}>{' ' + item.name + ' '}</li>;
      });
      selected_lables = <ul className="selected-labels">{labels_list}</ul>;
    }

    return (
      <div className={this.props.multiple ? 'selector multiple' : 'selector'}>
        {this.props.add_new ? <small className="new-source">جدید</small> : ''}
        <div>
          <Input
            placeholder={this.props.placeholder}
            type="text"
            className="rtl"
          />
          <Icon disabled className="search-icon" name="search" />
          {selected_lables}
        </div>
        <SelectorList items={this.props.items} />
      </div>
    );
  }
}
