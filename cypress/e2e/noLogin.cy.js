describe("Bypass Login dengan Cookie", () => {
  beforeEach(() => {
    cy.setCookie(
      "__session",
      "eyJ1c2VyQ3JlZCI6bnVsbCwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGJXRnBiQ0k2SW01bGQySnBaVEl6TkRaQVoyMWhhV3d1WTI5dElpd2ljM1ZpSWpvaU1UWWlMQ0p5YjJ4bGN5STZXeUpCWkcxcGJpSmRMQ0p5YjJ4bElqb2lNU0lzSW1saGRDSTZNVGN5TkRrNU1UVXdNeXdpWlhod0lqb3hOekkwT1RreU56QXpmUS41aktjcEliRXJBRmVzS0d6ZGV2d3EyNlJLOXJPc0lMQ2ZrYktJVENkMEQ0IiwiYnJhbmNoIjoiaGlzMSJ9.lEuTRZmiycKWTWzToB1IR4vvGmUdhtYku0I%2FmnJ3VUs"
    );
  });

  it("Mengakses halaman yang memerlukan login", () => {
    cy.visit("https://hcm-dev.trustmedis.net");

    cy.wait(5000);
    cy.contains("button", "Master").click();

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
  });
});
