import React, { Component } from 'react';

export default class SelectorList extends Component {
  render() {
    return (
      <div className="selector-list">
        <div className="empty-list">پاسخی یافت نشد.</div>
        <ul>
          {this.props.items.map(function (item, index) {
            return (
              <li className="show" data-id={index}>
                {item.name}
              </li>
            );
          })}
        </ul>
      </div>
    );
  }
}
