const { CYCLIC_KEY } = require("@storybook/addon-actions/dist/constants");

describe("Appointments", () => {

  beforeEach(()=> {
    cy.request("GET", "/api/debug/reset")
    cy.visit("/");
    cy.contains("Monday");
  })

  it.skip("should book an interview", () => {

    cy.get("[alt=Add]")
      .first()
      .click();

    cy.get("[data-testid=student-name-input]")
      .type("Lydia Miller-Jones");

    cy.get("[alt='Sylvia Palmer']")
      .click();
    
    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones")
    cy.contains(".appointment__card--show", "Sylvia Palmer")
    
  });

  
  it.skip("should edit an interview", () => {

    cy.get(".appointment__card--show")

    cy.get("[alt='Edit']")
      .first()
      .click({force: true})

    cy.get("[alt='Tori Malcolm']")
      .click()   
    
    cy.get("[data-testid=student-name-input]")
      .clear()
      .type("Lydia Miller-Jones")

    cy.contains("Save").click();

    cy.contains(".appointment__card--show", "Lydia Miller-Jones");
    cy.contains(".appointment__card--show", "Tori Malcolm");
  })

  it.skip("should cancel an interview", () => {
    cy.get(".appointment__card--show")

    cy.get("[alt='Delete']")
      .first()
      .click({force: true})
    
    cy.contains(".button--danger", "Confirm")
      .click()

    cy.get(".appointment__card--show").should('not.exist')

  })

  it.skip("clicks the delete button for an existing appointment", () => {
    cy.get(".appointment__card--show")

    cy.get("[alt='Delete']")
      .first()
      .click({force: true})

    cy.get("[alt='Delete']").should('not.exist')

  })

  it("clicks the confirm button", () => {
    cy.get(".appointment__card--show")

    cy.get("[alt='Delete']")
      .first()
      .click({force: true})
    
    cy.contains(".button--danger", "Confirm")
      .click()

    cy.get(".appointment__card--show").should('not.exist')
    
  })



});