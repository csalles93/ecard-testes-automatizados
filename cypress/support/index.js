// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:

import './commands';
import  'cypress-real-events/support'
require ('cypress-xpath');
const faker = require('../../node_modules/faker-br');
// Alternatively you can use CommonJS syntax:
// require('./commands')
// likely want to do this in a support file
// so it's applied to all spec files
// cypress/support/index.js
global.usuario = {
  nome: faker.name.firstName(),
  sobrenome: faker.name.lastName(),
  email: faker.internet.email(),
  ddd: faker.random.number({min:2}),
  telefone: faker.phone.phoneNumber()
}
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
  })

  import "cypress-real-events";