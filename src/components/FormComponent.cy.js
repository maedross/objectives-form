import { describe, it } from 'mocha'
import FormComponent from './FormComponent.vue'
import { cy } from 'cypress'

describe('<FormComponent />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-vue
    cy.mount(FormComponent)
  })

  it('renders with no buttons selected', () => {
    cy.mount(FormComponent)
    cy.get('input[type="radio"]').should('not.be.checked')
  })

  it('adds an objective and verifies no buttons selected in new form area', () => {
    cy.mount(FormComponent)
    // Select one of the Priority radio buttons
    cy.get('input[type="radio"]').first().check()
    // Add an objective (assuming there's a button or form to add an objective)
    cy.get('button.add-objective').click()
    // Verify that the new form area has no buttons selected
    cy.get('.new-form-area input[type="radio"]').should('not.be.checked')
  })
})
