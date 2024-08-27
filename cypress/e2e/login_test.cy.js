describe("Login Test with OTP", () => {
  it("Logs in and enters OTP", () => {
    cy.visit("https://hcm-dev.trustmedis.net/");

    cy.wait(500);
    cy.fillInput('[data-cy="email"]', "newbie2346@gmail.com");
    cy.fillInput('[data-cy="password"]', "!Konfirmasi1");

    cy.get('[data-cy="branch"]')
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.get('[role="presentation"]')
      .should("be.visible")
      .contains("HIS 1")
      .click();

    cy.get('[data-cy="branch"]').should("have.value", "HIS 1");

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

    // cy.get('a[href="/dashboard/profile"] button')
    //   .should("be.visible")
    //   .and("not.be.disabled")
    //   .click();

    // cy.get('button[data-variant="outline"][type="submit"]')
    //   .contains("Logout")
    //   .click();
  });
});
