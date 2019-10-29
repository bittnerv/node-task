import {expect} from 'chai';
import {INTERNAL_SERVER_ERROR, NO_CONTENT} from 'http-status-codes';
import {HttpEmptyResponseAdapter} from './http-empty-response-adapter';

describe('HttpEmptyResponseAdapter', () => {
    const adapter = new HttpEmptyResponseAdapter();

    describe('when creating response data', () => {
        it('should return empty response', async () => {
            await expect(adapter.createResponseData()).to.eventually
                .deep.equal({status: NO_CONTENT, body: {}});
        });
    });

    describe('when creating error response data', () => {
        it('should return INTERNAL SERVER ERROR response', async () => {
            const error = new Error('test-error');

            await expect(adapter.createErrorResponseData(error)).to.eventually
                .deep.equal({
                    body: {message: error.message, name: error.name},
                    status: INTERNAL_SERVER_ERROR,
                });
        });
    });
});
