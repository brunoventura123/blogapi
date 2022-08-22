describe('Carspage', () => {
    beforeEach(() => {
        cy.visit('/cars')
    })
    it('click in button, it become invisible', () => {
        cy.get('button:contains("Load More")').click()
        cy.get('button:contains("Load More")').should('not.exist')
    })
})
export { }