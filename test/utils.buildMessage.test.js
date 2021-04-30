const assert = require('assert');
const buildMessage = require('../utils/schemas/buildMessage');

// describe.only hace que solo se pruebe esta suite de test
describe.only('utils - buildMessage', function() {
    describe('when receives an entity and an action', function() {
        it('should return the respect message', function() {
            const result = buildMessage('movie', 'create');
            const expect = "movie created";
            assert.strictEqual(result, expect);
        })
    })

    describe('when receives an entity and an action and is a list', function () {
        it('should retunr the respective message with the entity in plural', function () {
            const result = buildMessage('movie', 'list');
            const expected = 'movies listed';
            assert.strictEqual(result, expected);
        })
    })
})