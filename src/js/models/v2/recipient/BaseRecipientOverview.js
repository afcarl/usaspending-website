/**
 * BaseRecipientOverview.js
 * Created by Lizzie Salita 6/14/18
 */

import * as MoneyFormatter from 'helpers/moneyFormatter';
import CoreLocation from 'models/v2/CoreLocation';

const BaseRecipientOverview = {
    populate(data) {
        this.name = data.name || '';
        this.duns = data.duns || null;
        this.parentName = data.parent_name || '';
        this.parentDuns = data.parent_duns || '';
        this._totalAmount = parseFloat(data.total_transaction_amount) || 0;
        this._totalTransactions = parseFloat(data.total_transactions) || 0;
        this.businessTypes = data.business_types || [];
        this.level = data.recipient_level || 'R';

        // Recipient Location
        let locationData = {};
        if (data.location) {
            locationData = {
                address1: data.location.address_line1,
                address2: data.location.address_line2,
                address3: data.location.address_line3,
                province: data.location.foreign_province,
                city: data.location.city_name,
                county: data.location.county_name,
                stateCode: data.location.state_code,
                zip5: data.location.zip5,
                zip4: data.location.zip4,
                foreignPostalCode: data.location.foreign_postal_code,
                country: data.location.country_name || '',
                countryCode: data.location.location_country_code || '',
                congressionalDistrict: data.location.congressional_code
            };
        }
        const location = Object.create(CoreLocation);
        location.populateCore(locationData);
        this.location = location;
    },
    get totalAmount() {
        if (this._totalAmount >= MoneyFormatter.unitValues.MILLION) {
            const units = MoneyFormatter.calculateUnitForSingleValue(this._totalAmount);
            return `${MoneyFormatter.formatMoneyWithPrecision(this._totalAmount / units.unit, 1)} ${units.longLabel}`;
        }
        return MoneyFormatter.formatMoneyWithPrecision(this._totalAmount, 0);
    },
    get totalTransactions() {
        return MoneyFormatter.formatNumberWithPrecision(this._totalTransactions, 0);
    }
};

export default BaseRecipientOverview;