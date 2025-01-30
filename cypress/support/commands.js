Cypress.Commands.add('fillMandatoryFieldsAndSubmit1', () => {
    cy.get('#firstName').type('Alencar')
    cy.get('#lastName').type('Wbatuba Teixeira')
    cy.get('#email').type('alencarw@hotmail.com')
    cy.get('#open-text-area').type('Comando Customizado!')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit2', data => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})

Cypress.Commands.add('fillMandatoryFieldsAndSubmit3', (data = {
    firstName: 'Jose',
    lastName: 'dos Santos',
    email: 'josedossantos@email.com',
    text: 'Comando Customizado 3'
}) => {
    cy.get('#firstName').type(data.firstName)
    cy.get('#lastName').type(data.lastName)
    cy.get('#email').type(data.email)
    cy.get('#open-text-area').type(data.text)
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()
})