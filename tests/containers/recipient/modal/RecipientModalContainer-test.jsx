/**
 * RecipientModalContainer-test.jsx
 * Created by Lizzie Salita 6/26/18
 */

import React from 'react';
import { shallow, mount } from 'enzyme';

// mock the state helper
jest.mock('helpers/recipientHelper', () => require('../mockRecipientHelper'));

import { RecipientModalContainer } from 'containers/recipient/modal/RecipientModalContainer';
import { mockModalActions, mockModalRedux } from '../mockData';
import { mockChildRecipients } from '../../../models/recipient/mockRecipientApi';
import BaseChildRecipient from 'models/v2/recipient/BaseChildRecipient';

// mock the child component by replacing it with a function that returns a null element
jest.mock('components/recipient/modal/RecipientModal', () => jest.fn(() => null));

describe('RecipientModalContainer', () => {
    it('should make an API call when the modal mounts', () => {
        const container = shallow(<RecipientModalContainer
            {...mockModalRedux}
            {...mockModalActions} />);

        const loadChildRecipients = jest.fn();
        container.instance().loadChildRecipients = loadChildRecipients;

        container.setProps({
            mounted: true
        });

        container.instance().componentDidUpdate(mockModalRedux);

        expect(loadChildRecipients).toHaveBeenCalledTimes(1);
    });
    it('should call updateSort with the default params when recipient.children changes', () => {
        const container = shallow(<RecipientModalContainer
            {...mockModalRedux}
            {...mockModalActions} />);

        const updateSort = jest.fn();
        container.instance().updateSort = updateSort;

        // Update child recipients
        const parsed = mockChildRecipients.map((mockChild) => {
            const childRecipient = Object.create(BaseChildRecipient);
            childRecipient.populate(mockChild);
            return childRecipient;
        });

        const recipient = Object.assign({}, mockModalRedux.recipient, {
            children: parsed
        });

        const nextProps = Object.assign({}, mockModalRedux, {
            recipient
        });

        container.setProps(nextProps);

        container.instance().componentDidUpdate(mockModalRedux);

        expect(updateSort).toHaveBeenCalledTimes(1);
        expect(updateSort).toHaveBeenCalledWith('name', 'asc');
    });
    describe('parseChildren', () => {
        it('should update the Redux state with a new BaseChildRecipient', () => {
            const container = shallow(<RecipientModalContainer
                {...mockModalRedux}
                {...mockModalActions} />);

            // Reset the mock action's call count
            mockModalActions.setRecipientChildren.mockReset();

            container.instance().parseChildren(mockChildRecipients);

            const expectedParam = mockChildRecipients.map((mockChild) => {
                const childRecipient = Object.create(BaseChildRecipient);
                childRecipient.populate(mockChild);
                return childRecipient;
            });

            expect(mockModalActions.setRecipientChildren).toHaveBeenCalledTimes(1);
            expect(mockModalActions.setRecipientChildren).toHaveBeenCalledWith(expectedParam);
        });
    });
    describe('updateSort', () => {
        it('should update the state and store child recipients in the given order', () => {
            const container = shallow(<RecipientModalContainer
                {...mockModalRedux}
                {...mockModalActions} />);

            // Add child recipients to the props
            const parsed = mockChildRecipients.map((mockChild) => {
                const childRecipient = Object.create(BaseChildRecipient);
                childRecipient.populate(mockChild);
                return childRecipient;
            });

            const recipient = Object.assign({}, mockModalRedux.recipient, {
                children: parsed
            });

            const nextProps = Object.assign({}, mockModalRedux, {
                recipient
            });

            container.setProps(nextProps);

            // Call updateSort
            container.instance().updateSort('amount', 'desc');

            // The order should be reversed because the second mock item has a larger amount
            const expectedOrder = [parsed[1], parsed[0]];

            expect(container.state().sortField).toEqual('amount');
            expect(container.state().sortDirection).toEqual('desc');
            expect(container.state().childRecipients).toEqual(expectedOrder);
        });
    });
});
