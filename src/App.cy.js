import { describe, it } from 'mocha'
import App from './App.vue'
import { cy } from 'cypress'

describe('<App />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(App)
  })

  it('renders with no buttons selected', () => {
    cy.mount(App)
    cy.get('input[type="radio"]').should('not.be.checked')
  })

  it('adds an objective and verifies no buttons selected in new form area', () => {
    cy.mount(App)
    // Select one of the Priority radio buttons
    cy.get('input[type="radio"]').first().check()
    // Add an objective (assuming there's a button or form to add an objective)
    cy.get('button.add-objective').click()
    // Verify that the new form area has no buttons selected
    cy.get('.new-form-area input[type="radio"]').should('not.be.checked')
  })
})
