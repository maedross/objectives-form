describe('Objective Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  // Adding a new objective does not change the inputs of the previous objective
  it('Adding a new objective and selecting properties does not affect previous objective', () => {
    cy.get('input[id="select-0-0-0"]').click()
    cy.get('input[id="secondary-0-0-0"]').click()
    cy.get('input[id="prereq-0-0-0"]').click()
    cy.get('input[id="exclusive-0-0-0"]').click()

    cy.get('button[id="add-obj-0-0"]').click()
    cy.get('div[id="objective-1-0-0"]').should('exist')
    cy.get('input[id="kill-1-0-0"]').click()
    cy.get('input[id="uncond-1-0-0"]').click()

    cy.get('input[id="select-0-0-0"]').should('be.checked')
    cy.get('input[id="kill-0-0-0"]').should('not.be.checked')
    cy.get('input[id="uncond-0-0-0"]').should('not.be.checked')
    cy.get('input[id="prereq-0-0-0"]').should('be.checked')
    cy.get('input[id="exclusive-0-0-0"]').should('be.checked')
  })

  // Selecting multiple radio buttons is impossible
  it('Selecting multiple radio buttons is impossible', () => {
    cy.get('input[id="select-0-0-0"]').click()
    cy.get('input[id="kill-0-0-0"]').click()

    cy.get('input[id="select-0-0-0"]').should('not.be.checked')
  })

  // Hitting submit does not set all checkbox inputs to selected
  it('Hitting submit does not select all checkbox inputs', () => {
    cy.get('button[id="submit"]').click()
    cy.get('input[id="uncond-0-0-0"]').should('not.be.checked')
    cy.get('input[id="prereq-0-0-0"]').should('not.be.checked')
    cy.get('input[id="exclusive-0-0-0"]').should('not.be.checked')
  })

  // Data is properly generated
  it('Data is properly generated', () => {
    cy.get('input[id="game-name"]').type('Test Game Name')
    cy.get('input[id="campaign-name-0"]').type('Test Campaign 1')
    cy.get('input[id="scenario-name-0-0"]').type('Test Scenario 1')
    cy.get('input[id="text-0-0-0"]').type('Test Objective Text')
    cy.get('input[id="select-0-0-0"]').click()
    cy.get('input[id="primary-0-0-0"]').click()
    cy.get('input[id="victory-0-0-0"]').click()
    cy.get('input[id="stat-timed-0-0-0"]').click()
    cy.get('input[id="prereq-0-0-0"]').click()
    cy.get('input[id="exclusive-0-0-0"]').click()
    cy.get('input[id="possible-0-0-0"]').click()
    cy.get('input[id="notes-0-0-0"]').type('Test notes')

    cy.get('button[id="submit"]').click()

    cy.get('pre[id="json-data"]').then(($pre) => {
      const jsonData = JSON.parse($pre.text())
      const testData = {
        name: 'Test Game Name',
        campaigns: [
          {
            name: 'Test Campaign 1',
            scenarios: [
              {
                name: 'Test Scenario 1',
                objectives: [
                  {
                    text: 'Test Objective Text',
                    identity: 'Select unit',
                    priority: 'Primary',
                    effects: ['Victory'],
                    time: 'Statically timed',
                    conditions: ['Prerequisites', 'Exclusive'],
                    possibility: 'Possible',
                    notes: 'Test notes',
                  },
                ],
              },
            ],
          },
        ],
      }
      expect(jsonData).to.deep.equal(testData)
    })
  })
})
