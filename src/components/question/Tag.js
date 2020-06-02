import React, { Component } from "react";
import { Label } from 'semantic-ui-react';


const colors = ["blue", "purple", "brown", "pink", "green", "red", "yellow",]


export default class Tag extends Component {
    constructor(props) {
        super(props);
        this.state = {
            numberHolder: 1,
        };
    }

    render() {
        return (
            <Label
                color={colors[Math.floor(Math.random() * colors.length)]}
                tag
                size="large"
            >
                {this.props.name}
            </Label >
        );
    }
}