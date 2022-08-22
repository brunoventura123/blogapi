describe('Login', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('should enter login page', () => {
        cy.title().should('contain', 'Login')
    })
    it('should get an error on login with wrong credentials', () => {
        const email = 'wrong@gmail.com'
        const password = '567'
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.contains('Log In').click()
        cy.contains('Acesso negado')
        // cy.url().should('contain', 'algun texto da url')
    });
    it('should do credential login properly', () => {
        const email = 'bruno@gmail.com'
        const password = '1234'
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.contains('Log In').click()
        cy.get('button').should('have.text', 'Logout')
        //cy.get('button:contains("Logout")').should('exist')
        // cy.url().should('contain', 'algun texto da url')
    });
    it('should do logout', () => {
        const email = 'bruno@gmail.com'
        const password = '1234'
        cy.get('#email').type(email)
        cy.get('#password').type(password)
        cy.contains('Log In').click()
        cy.get('button:contains("Logout")').click()
        cy.get('button:contains("Login")').should('exist')
        //cy.get('button:contains("Logout")').should('exist')
        // cy.url().should('contain', 'algun texto da url')
    })
})


export { }














/**
 before(() => {
// executa antes de todos os testes
    })
    after(() => {
        // executa depois de todos os testes
    })

    beforeEach(() => {
        // executa antes de cada teste
    })
    after(() => {
        // executa depois de cada teste
    })
 */