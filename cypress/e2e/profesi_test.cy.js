describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });

    cy.login();
    cy.wait(5000);
  });

  it("Tambah Data Profesi", () => {
    cy.contains("button", "Master").click();

    cy.wait(5000);

    cy.contains("button", "Profesi").scrollIntoView().click();

    cy.contains("Tambah Profesi").click();
    cy.wait(2000);

    cy.get('[data-path="profesi_nama"]').type("Tech QA");
    cy.get('[data-path="profesi_jenis"]').click();

    cy.get(".mantine-ScrollArea-root")
      .should("be.visible")
      .contains("Medis")
      .click();

    cy.get('[data-path="profesi_keterangan"]').type("Quality Assurance");

    cy.contains("Simpan").click();
    cy.wait(6000);

    cy.get('a[href="/dashboard/profile"] button')
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.get('button[data-variant="outline"][type="submit"]')
      .contains("Logout")
      .click();
  });
});
