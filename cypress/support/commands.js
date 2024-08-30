// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add("fillInput", (selector, text) => {
  cy.get(selector)
    .should("be.visible")
    .and("not.be.disabled")
    .then(($input) => {
      if (text === "") {
        cy.wrap($input).clear();
      } else {
        cy.wrap($input).type(text);
      }
    });
});

Cypress.Commands.add("login", () => {
  cy.visit("https://hcm-dev.trustmedis.net/");
  cy.wait(500);

  cy.get('[data-cy="email"]')
    .should("be.visible")
    .and("not.be.disabled")
    .type("newbie2346@gmail.com");
  cy.get('[data-cy="password"]')
    .should("be.visible")
    .and("not.be.disabled")
    .type("!Konfirmasi1");

  cy.get('[data-cy="branch"]')
    .should("be.visible")
    .and("not.be.disabled")
    .click();

  cy.get('[role="presentation"]')
    .should("be.visible")
    .contains("HIS 1")
    .click();

  cy.get('[data-cy="submit"]').click();

  cy.get(".mantine-Modal-body").contains("Okay").should("be.visible");
  cy.contains("button", "Okay").click();

  cy.task("getOtp").then((otpCode) => {
    if (otpCode) {
      cy.get(".mantine-PinInput-input").each((input, index) => {
        cy.wrap(input).type(otpCode.charAt(index));
      });

      cy.get('[data-cy="submit"]').click();
    } else {
      throw new Error("OTP not found");
    }
  });
});
