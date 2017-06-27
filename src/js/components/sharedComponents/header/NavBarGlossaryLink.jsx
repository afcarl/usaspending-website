/**
 * NavBarGlossaryLink.jsx
 * Created by Kevin Li 4/28/17
 */

import React from 'react';

import { Glossary } from '../icons/Icons';

const propTypes = {
    toggleGlossary: React.PropTypes.func
};

export default class NavBarGlossaryLink extends React.Component {
    constructor(props) {
        super(props);

        this.clickedButton = this.clickedButton.bind(this);
    }

    clickedButton() {
        this.props.toggleGlossary();
    }

    render() {
        return (
            <button
                aria-label="Show Glossary"
                className="header-glossary-button"
                id="header-glossary-button"
                onClick={this.clickedButton}>
                <div className="glossary-button-content">
                    <span className="glossary-button-icon">
                        <Glossary alt="Glossary" />
                    </span>
                    Glossary
                </div>
            </button>
        );
    }
}

NavBarGlossaryLink.propTypes = propTypes;
