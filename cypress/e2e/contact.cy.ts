describe('Contact', () => {
    beforeEach(() => {
        cy.visit('/contact')
    })
    it('should error if empty fields', () => {
        cy.get('form button').click()
        cy.contains('Preencha todos os campos.')
    })
    it('should send form if all fill fields', () => {
        cy.get('#name').type('Bruno')
        cy.get('#email').type('bruno@gmail.com')
        cy.get('#subject').type('Testando...')
        cy.get('#message').type('Testando de novo')
        cy.get('form button').click()
        cy.contains('Highlights')
    })
})
export { }