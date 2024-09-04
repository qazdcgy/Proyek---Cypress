describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.loginCookie();
    cy.visit("https://hcm-dev.trustmedis.net");
    cy.wait(5000);

    cy.contains("button", "Master").click();
    cy.wait(5000);
    cy.contains("button", "Profesi").scrollIntoView().click();
  });

  it("Tambah Data Profesi", () => {
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
  });

  it("Ubah Data Profesi", () => {
    cy.get(".mantine-Checkbox-input").eq(5).check();
    cy.contains("Ubah").click();
    cy.wait(2000);

    cy.get('[data-path="profesi_nama"]').clear().type("Tech QA");
    cy.get('[data-path="profesi_jenis"]').click();

    cy.get(".mantine-ScrollArea-root")
      .should("be.visible")
      .contains("Non-Medis")
      .click();

    cy.get('[data-path="profesi_keterangan"]').type("Quality Assurance");
    cy.contains("Simpan").click();
    cy.wait(6000);
  });

  it("Hapus data Profesi", () => {
    cy.get(".mantine-Checkbox-input").eq(5).check();
    cy.contains("Hapus").click();
    cy.wait(2000);

    cy.get(".mantine-Modal-body")
      .should("be.visible")
      .and("contain", "Hapus Data");

    cy.get('button[aria-label="Delete"]').click();
  });
});
