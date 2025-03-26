describe('Objective Form', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  // Adding a new objective does not change the inputs of the previous objective
  it('Adding a new objective and selecting properties does not affect previous objective', () => {
    cy.get('input[id="0-select"]').click()
    cy.get('input[id="0-secondary"]').click()
    cy.get('input[id="0-prereq"]').click()
    cy.get('input[id="0-exclusive"]').click()

    cy.get('button[id="0-0-add objective"]').click()
    cy.get('div[id="objective-2-1-1"]').should('exist')
    cy.get('input[id="1-kill"]').click()
    cy.get('input[id="1-no cond"]').click()

    cy.get('input[id="0-select"]').should('be.checked')
    cy.get('input[id="0-kill"]').should('not.be.checked')
    cy.get('input[id="0-no cond"]').should('not.be.checked')
    cy.get('input[id="0-prereq"]').should('be.checked')
    cy.get('input[id="0-exclusive"]').should('be.checked')
  })

  // Selecting multiple radio buttons is impossible
  it('Selecting multiple radio buttons is impossible', () => {
    cy.get('input[id="0-select"]').click()
    cy.get('input[id="0-kill"]').click()

    cy.get('input[id="0-select"]').should('not.be.checked')
  })

  // Hitting submit does not set all checkbox inputs to selected
  it('Hitting submit does not select all checkbox inputs', () => {
    cy.get('button[id="submit"]').click()
    cy.get('input[id="0-no cond"]').should('not.be.checked')
    cy.get('input[id="0-prereq"]').should('not.be.checked')
    cy.get('input[id="0-exclusive"]').should('not.be.checked')
  })

  // Data is properly generated
  it.only('Data is properly generated', () => {
    cy.get('input[id="game-name"]').type('Test Game Name')
    cy.get('input[id="campaign-name-0"]').type('Test Campaign 1')
    cy.get('input[id="scenario-name-0-0"]').type('Test Scenario 1')
    cy.get('input[id="0-text"]').type('Test Objective Text')
    cy.get('input[id="0-select"]').click()
    cy.get('input[id="0-primary"]').click()
    cy.get('input[id="0-victory"]').click()
    cy.get('input[id="0-stat timed"]').click()
    cy.get('input[id="0-prereq"]').click()
    cy.get('input[id="0-exclusive"]').click()
    cy.get('input[id="0-possible"]').click()
    cy.get('input[id="0-notes"]').type('Test notes')

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
