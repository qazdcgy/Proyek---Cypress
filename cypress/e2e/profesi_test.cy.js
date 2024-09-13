describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.loginCookie();
    cy.visit("https://hcm-dev.trustmedis.net");
    cy.wait(5000);

    cy.contains("button", "Master").click();
    cy.wait(5000);
    cy.contains("button", "Profesi").scrollIntoView().click();
  });

  // it("Tambah Data Profesi", () => {
  //   cy.contains("Tambah Profesi").click();
  //   cy.wait(2000);

  //   cy.get('[data-path="profesi_nama"]').type("Tech QA");
  //   cy.get('[data-path="profesi_jenis"]').click();

  //   cy.get(".mantine-ScrollArea-root")
  //     .should("be.visible")
  //     .contains("Medis")
  //     .click();

  //   cy.get('[data-path="profesi_keterangan"]').type("Quality Assurance");
  //   cy.contains("Simpan").click();
  //   cy.wait(6000);
  // });

  // it("Ubah Data Profesi", () => {
  //   cy.get(".mantine-Checkbox-input").eq(5).check();
  //   cy.contains("Ubah").click();
  //   cy.wait(2000);

  //   cy.get('[data-path="profesi_nama"]').clear().type("Tech QA");
  //   cy.get('[data-path="profesi_jenis"]').click();

  //   cy.get(".mantine-ScrollArea-root")
  //     .should("be.visible")
  //     .contains("Non-Medis")
  //     .click();

  //   cy.get('[data-path="profesi_keterangan"]').type("Quality Assurance");
  //   cy.contains("Simpan").click();
  //   cy.wait(6000);
  // });

  // it("Hapus data Profesi", () => {
  //   cy.get(".mantine-Checkbox-input").eq(5).check();
  //   cy.contains("Hapus").click();
  //   cy.wait(2000);

  //   cy.get(".mantine-Modal-body")
  //     .should("be.visible")
  //     .and("contain", "Hapus Data");

  //   cy.get('button[aria-label="Delete"]').click();
  // });

  // it("Filter data", () => {
  //   cy.contains("Filter").click();
  //   cy.get('[aria-label="pilih tipe profesi"]')
  //     .should("be.visible")
  //     .and("not.be.disabled")
  //     .click();

  //   cy.get('[value="Medis"]')
  //     .should("be.visible")
  //     .and("not.be.disabled")
  //     .click();

  //   cy.contains("button", "Terapkan").click();
  // });

  // it("Search data", () => {
  //   cy.wait(5000);
  //   cy.get('input[placeholder="Search here"]')
  //     .should("be.visible")
  //     .clear()
  //     .type("Bidan{enter}");
  // });

  it("Pagination test", () => {
    cy.wait(3000);
    cy.get(".mantine-Pagination-control")
      .filter(":not(:has(svg))")
      .last()
      .invoke("text")
      .then((lastPage) => {
        const totalPages = parseInt(lastPage.trim(), 10);

        cy.log(`Total pages: ${totalPages}`);
        cy.wrap(totalPages).as("totalPages");
      });

    cy.get("@totalPages").then((totalPages) => {
      cy.get('.mantine-Pagination-control[data-active="true"]').should(
        "contain",
        "1"
      );

      cy.get("tbody tr").should("have.length", 10);

      cy.get(".mantine-Pagination-control").contains("2").click();

      cy.get('.mantine-Pagination-control[data-active="true"]').should(
        "contain",
        "2"
      );

      cy.get("tbody tr").should("have.length", 10);

      // cy.get(".mantine-Pagination-control")
      //   .contains(totalPages.toString())
      //   .click();

      // cy.get('.mantine-Pagination-control[data-active="true"]').should(
      //   "contain",
      //   totalPages.toString()
      // );
    });
    // cy.get(".mantine-Pagination-control").first().should("be.disabled");
    // cy.get(".mantine-Pagination-control").eq(1).should("be.disabled");

    // cy.get(".mantine-Pagination-control").last().click();
    // cy.wait(3000);

    // cy.get(".mantine-Pagination-control").first().should("not.be.disabled");
    // cy.get(".mantine-Pagination-control").eq(1).should("not.be.disabled");

    // cy.wait(3000);

    // cy.get(".mantine-Pagination-control").first().click();
  });
});
