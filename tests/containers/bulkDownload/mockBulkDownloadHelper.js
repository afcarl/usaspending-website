import { mockStatusResponse, mockAwardDownloadResponse, mockAgencies, mockArchiveResponse, mockFederalAccounts } from './mockData';

export const requestAgenciesList = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: {
                    agencies: mockAgencies,
                    sub_agencies: [],
                    federal_accounts: []
                }
            });
        });
    }),
    cancel: jest.fn()
});

export const requestFederalAccountList = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: {
                    results: mockFederalAccounts
                }
            });
        });
    }),
    cancel: jest.fn()
});

export const requestAwardsDownload = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockAwardDownloadResponse
            });
        });
    }),
    cancel: jest.fn()
});

export const requestBulkDownloadStatus = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockStatusResponse
            });
        });
    }),
    cancel: jest.fn()
});

export const requestArchiveFiles = () => ({
    promise: new Promise((resolve) => {
        process.nextTick(() => {
            resolve({
                data: mockArchiveResponse
            });
        });
    }),
    cancel: jest.fn()
});