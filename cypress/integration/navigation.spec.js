describe("Navigation", () => {
  
  it("should visit root", () => {
    cy.visit("/");
  });

  it("should click on the day 'Tuesday'" , () => {
    cy.visit("/");

    cy.contains("[data-testid=day]", "Tuesday")
      .click()
      .should("have.css","background-color", "rgb(242, 242, 242)")
  });


});