describe('Teste', () => {
    beforeEach(() => {
        cy.visit('/teste')
    })
    it('should contain title teste', () => {
        cy.title().should('contain', 'Teste')
    })
    it('should increment count on button aumentar', () => {
        cy.get('h1').then(($h1) => {
            const beforeCount = $h1.text().match(/\((\d+)\)/i)?.at(1)
            if (beforeCount) {
                cy.contains('button').click()
                cy.get('h1').then(($h1) => {
                    const afterCount = $h1.text().match(/\((\d+)\)/)?.at(1)
                    if (afterCount) {
                        const before = parseInt(beforeCount)
                        const after = parseInt(afterCount)
                        expect(after).to.be.equal(before + 1)
                    }
                })
            }
        })
    })
})