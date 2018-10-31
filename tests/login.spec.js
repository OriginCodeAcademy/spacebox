'use strict';
const express = require('express');
const Nightmare = require('nightmare');
const expect = require('chai').expect;
const server = require('../server/server');



server.listen(8888)


let nightmare;

describe('Login Page', function main() {
    this.timeout(10000);
    const url = 'http://localhost:8888/#/admin';
   


    beforeEach(() => {
        nightmare = new Nightmare({ show: true });
    });


    

    it('should be able to login using the default username and password', (done) =>{
        nightmare
        .goto(url)
        .wait(1000)
        .type('#username', 'DefaultAdmin')
        .type('#password', 'admin')
        .wait(1000)
        .click('#submit')
        .wait(2000)
        .evaluate(() => document.querySelector('h1').innerText)
        .end()
        .then(text=> {
            expect(text).to.contain('DASHBOARD');
            done();
        })
        .catch(err => console.log(err));
    })

})


