const mocha = require('mocha');
const assert = require('assert');
const Person = require('./models/User');

describe('Saving Records', () => {
    it('Saves a record to the database', (done) => {
        let user = new Person({
            name: "Arkaraj",
            password: "test1234",
            email: "arkaraj2017@gmail.com"
        });
        // async process
        user.save().then(() => {
            // user.isNew is gonna return either true or false it returns true when we've created this user locally but not saved into the db yet, false if saved it to the database
            assert(user.isNew === false);
            // done move on to next test
        });
        done();
    });

});