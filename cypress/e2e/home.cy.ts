describe('Home', () => {
    it('should load the page', () => {
        cy.visit('/');
    });
    it('should load the page in english', () => {
        cy.visit('/');
        cy.get('h2').should('contain', 'Categories');
    });
    it('should load the page in wrong language', () => {
        cy.visit('/pt');
        cy.get('h2').should('not.contain', 'Categories');
    });
    it('should go to login page', () => {
        cy.visit('/');
        cy.contains('Login').click()
        cy.url().should('include', '/login')
    });
})
export { }