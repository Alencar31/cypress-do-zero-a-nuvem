describe('Central de Atendimento ao Cliente TAT', () => {

  beforeEach(() => {
    cy.visit('./src/index.html')
  })

  it('verifica o título da aplicação', () => {
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('Preenche os campos obrigatórios e envia o formulário', () => {
    const longText = Cypress._.repeat('abcdefghijklmnopqrstuvwxyz', 10)
    cy.get('#firstName').type('Alencar')
    cy.get('#lastName').type('Wbatuba Teixeira')
    cy.get('#email').type('alencarw@hotmail.com')
    cy.get('#open-text-area').type(longText, {delay: 0})
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()

    cy.get('.success').should('be.visible')
  })

  it.only('Exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', () => {
    cy.get('#firstName').type('Alencar')
    cy.get('#lastName').type('Wbatuba Teixeira')
    cy.get('#email').type('alencar')
    cy.get('#open-text-area').type('Teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')    
  })

  it('Campo telefone continua vazio quando preenchido com valor não numérico', () => {
    cy.get('#phone')
      .type('telefone inválido')
      .should('have.value', '')
  })

  it('Exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', () =>{
    cy.get('#firstName').type('Alencar')
    cy.get('#lastName').type('Wbatuba Teixeira')
    cy.get('#email').type('alencarw@hotmail.com')
    //cy.get('#phone-checkbox').click()
    cy.get('#phone-checkbox').check()
    cy.get('#open-text-area').type('Teste')
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')      
  })

  it('Preenche e limpa os campos nome, sobrenome, email e telefone', () => {
    cy.get('#firstName')
      .type('Alencar')
      .should('have.value','Alencar')
      .clear()
      .should('have.value','')
    cy.get('#lastName')
      .type('Wbatuba Teixeira')
      .should('have.value','Wbatuba Teixeira')
      .clear()
      .should('have.value','')   
      cy.get('#email')
        .type('alencarw@hotmail.com')       
        .should('have.value','alencarw@hotmail.com')
        .clear()
        .should('have.value','')
      cy.get('#phone')
        .type('123456789')       
        .should('have.value','123456789')
        .clear()
        .should('have.value','')        
  })

  it('Exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', () => {
    //cy.get('button[type="submit"]').click()
    cy.contains('button','Enviar').click()

    cy.get('.error').should('be.visible')  
  })

  it('Envia o formulário com sucesso usando um comando customizado - 1', () => {
    cy.fillMandatoryFieldsAndSubmit1()

    cy.get('.success').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado - 2', () => {
    const data = {
      firstName: 'Paulo',
      lastName: 'da Silva',
      email: 'paulodasilva@mail.com',
      text: 'Segundo comando customizado'
    }
    cy.fillMandatoryFieldsAndSubmit2(data)

    cy.get('.success').should('be.visible')
  })

  it('Envia o formulário com sucesso usando um comando customizado - 3', () => {
    cy.fillMandatoryFieldsAndSubmit3()

    cy.get('.success').should('be.visible')
  })

  it('Seleciona um produto (YouTube) por seu texto', () => {
    cy.get('#product')
      .select('YouTube')
      .should('have.value', 'youtube')
  })
  
  it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })

    it('Seleciona um produto (Mentoria) por seu valor (value)', () => {
    cy.get('#product')
      .select('mentoria')
      .should('have.value', 'mentoria')
  })
  
  it('Seleciona um produto (Blog) por seu indice', () => {
    cy.get('#product')
      .select(1)
      .should('have.value', 'blog')
  })

  it('Marca o tipo de atendimento "Feedback"', () => {
    cy.get('input[type="radio"][value="feedback"]')
      .check()
      .should('be.checked')
  })

  it('Marca cada tipo de atendimento', () => {
    cy.get('input[type="radio"]')
      .each(tipoDeServico => {
        cy.wrap(tipoDeServico)
          .check()
          .should('be.checked')
      })
  })

  it('Marcar ambos checkboxes, depois desmarca o último', () => {
    cy.get('input[type="checkbox"]').check()
      .should('be.checked')
      .last()
      .uncheck()
      .should('not.be.checked')
  })

  it('Selecione um arquivo da pasta fixtures', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json')
      .should(input => {
        //console.log(input)
        //console.log(input[0].files[0].name)
        expect(input[0].files[0].name).to.equal('example.json')
      })
  })

  it('Seleciona um arquivo simulando um drag-and-drop', () => {
    cy.get('#file-upload')
      .selectFile('cypress/fixtures/example.json',{action: 'drag-drop'})
      .should(input => {
        expect(input[0].files[0].name).to.equal('example.json')    
      })
  })

  it('Seleciona um arquivo utilizando uma fixture para a qual foi dad um alias', () => {
    cy.fixture('example.json').as('arquivoExemplo')
    cy.get('#file-upload')
    .selectFile('@arquivoExemplo')
    .should(input => {
      expect(input[0].files[0].name).to.equal('example.json')
    })
  })

  it('Verifica que a politica de privacidade abre em outra aba sem a necessidade de um clique', () => {
    cy.contains('a', 'Política de Privacidade')
      .should('have.attr', 'href', 'privacy.html')
      .and('have.attr', 'target', '_blank')
  })

  it('Acessa a página de política de privacidade removendo o target e então clicando no link', () => {
    cy.contains('a', 'Política de Privacidade')
    .invoke('removeAttr', 'target')
    .click()
  
    cy.contains('h1', 'CAC TAT - Política de Privacidade')
      .should('be.visible')
  })
})