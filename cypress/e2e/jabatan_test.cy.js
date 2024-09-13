describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.loginCookie();
    cy.visit("https://hcm-dev.trustmedis.net");
    cy.wait(5000);

    cy.contains("button", "Master").click();
    cy.wait(5000);
    cy.contains("button", "Jabatan").scrollIntoView().click();
  });

  // it("Tambah Data Jabatan", () => {
  //   cy.contains("Tambah Jabatan").click();
  //   cy.wait(2000);

  //   cy.get('[data-path="jabatan_kode"]').type("W003");
  //   cy.get('[data-path="group_level"]').click();

  //   cy.get('[role="presentation"]')
  //     .should("be.visible")
  //     .contains("BOD 1")
  //     .click();

  //   cy.get('[data-path="jabatan_nama"]').type("Direktur");

  //   cy.get('[data-path="parent_id"]').type("apoteker");
  //   cy.wait(5000);

  //   cy.get('[role="presentation"]')
  //     .should("be.visible")
  //     .contains("apoteker")
  //     .click();

  //   cy.get('[data-path="jabatan_keterangan"]').type("--");

  //   cy.contains("Simpan").click();
  //   cy.wait(6000);
  // });

  // it("Ubah Data Jabatan", () => {
  //   cy.get(".mantine-Checkbox-input").eq(5).check();
  //   cy.contains("Ubah").click();
  //   cy.wait(2000);

  //   cy.get('[data-path="jabatan_kode"]').clear().type("W003");
  //   cy.get('[data-path="group_level"]').click();

  //   cy.get('[role="presentation"]')
  //     .should("be.visible")
  //     .contains("BOD 2")
  //     .click();

  //   cy.get('[data-path="jabatan_nama"]').clear().type("Direktur");

  //   cy.get('[data-path="parent_id"]').clear().type("apoteker");

  //   cy.wait(5000);

  //   cy.get('[role="presentation"]')
  //     .should("be.visible")
  //     .contains("apoteker")
  //     .click();

  //   cy.get('[data-path="jabatan_keterangan"]').clear().type("--");

  //   cy.contains("Simpan").click();
  //   cy.wait(6000);
  // });

  it("Hapus data Profesi", () => {
    cy.get(".mantine-Checkbox-input").eq(5).check();
    cy.contains("Hapus").click();
    cy.wait(2000);

    cy.get(".mantine-Modal-body")
      .should("be.visible")
      .and("contain", "Hapus Data");

    cy.get('button[aria-label="Delete"]').click();
  });

  // it("Search data", () => {
  //   cy.wait(5000);
  //   cy.get('input[placeholder="Cari data"]')
  //     .should("be.visible")
  //     .clear()
  //     .type("CMO{enter}");
  // });
});
