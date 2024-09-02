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

Cypress.Commands.add("loginCookie", () => {
  cy.setCookie(
    "__session",
    "eyJ1c2VyQ3JlZCI6bnVsbCwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGJXRnBiQ0k2SW01bGQySnBaVEl6TkRaQVoyMWhhV3d1WTI5dElpd2ljM1ZpSWpvaU1UWWlMQ0p5YjJ4bGN5STZXeUpCWkcxcGJpSmRMQ0p5YjJ4bElqb2lNU0lzSW1saGRDSTZNVGN5TlRJMU9UWTFNeXdpWlhod0lqb3hOekkxTWpZd09EVXpmUS5MakJMbWNQM01JZ091aFJzaDlINWc0NXk3SVpYcGNDZEo0WjJVZmpaR2U0IiwiYnJhbmNoIjoiaGlzMSJ9.dniuITtfamvlWrqgUgSaxctmbk6kM85JWIGV8n0q9iE"
  );
});
