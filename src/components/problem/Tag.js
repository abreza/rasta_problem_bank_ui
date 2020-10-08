import React, { Component } from 'react';
import { Label } from 'semantic-ui-react';

export default class Tag extends Component {
  constructor(props) {
    super(props);
    this.toggleSelected = this.toggleSelected.bind(this);
  }

  toggleSelected() {
    if (this.props.onChange) {
      this.props.onChange(this.props.id, !this.props.selected);
    }
  }

  render() {
    return (
      <span style={{ margin: '3px', display: 'inline-block' }}>
        <Label
          tag
          size={this.props.size}
          className={
            this.props.selectable
              ? this.props.selected
                ? 'selectable-tag selected'
                : 'selectable-tag'
              : ''
          }
          onClick={this.props.selectable ? this.toggleSelected : () => { }}
        >
          {this.props.name}
        </Label>
      </span >
    );
  }
}
