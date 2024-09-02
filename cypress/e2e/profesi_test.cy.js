describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.setCookie(
      "__session",
      "eyJ1c2VyQ3JlZCI6bnVsbCwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGJXRnBiQ0k2SW1aaGFYRmhhR1psY21GeWFYTjBZV2hBWjIxaGFXd3VZMjl0SWl3aWMzVmlJam9pTVRjaUxDSnliMnhsY3lJNld5SkJaRzFwYmlKZExDSnliMnhsSWpvaU1TSXNJbWxoZENJNk1UY3lOVEkxTURJeU5Td2laWGh3SWpveE56STFNalV4TkRJMWZRLnZhQjh0ZVBvbG9XRjFlbmtSTGhVdU5ZamdxT21tTG9YN3ZRaWNrZnAzNUkiLCJicmFuY2giOiJoaXMxIn0%3D.0DZvMQEj9cga4IASugeQphiK%2BGPeu8Movlk6hxmswI4"
    );
  });

  it("Tambah Data Profesi", () => {
    cy.visit("https://hcm-dev.trustmedis.net");

    cy.wait(5000);

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

  it("Ubah Data Profesi", () => {
    cy.visit("https://hcm-dev.trustmedis.net");

    cy.wait(5000);

    cy.contains("button", "Master").click();

    cy.wait(5000);

    cy.contains("button", "Profesi").scrollIntoView().click();

    cy.get(".mantine-Checkbox-input").eq(5).check();

    cy.contains("Ubah").click();
    cy.wait(2000);

    cy.get('[data-path="profesi_nama"]').type("Tech QA");
    cy.get('[data-path="profesi_jenis"]').click();

    cy.get(".mantine-ScrollArea-root")
      .should("be.visible")
      .contains("Non-Medis")
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
