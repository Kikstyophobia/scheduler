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

  
  it("should edit an interview", () => {

    cy.get(".appointment__card--show")

    cy.get("[alt='Edit']")
      .click({force: true})

    cy.get("[alt='Tori Malcolm']")
      .click()   
    
    cy.get("[data-testid=student-name-input]")
      .clear()
 
  })


});