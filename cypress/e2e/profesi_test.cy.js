describe("Master -> Profesi", () => {
  beforeEach(() => {
    cy.setCookie(
      "__session",
      "eyJ1c2VyQ3JlZCI6bnVsbCwiYWNjZXNzVG9rZW4iOiJleUpoYkdjaU9pSklVekkxTmlJc0luUjVjQ0k2SWtwWFZDSjkuZXlKbGJXRnBiQ0k2SW01bGQySnBaVEl6TkRaQVoyMWhhV3d1WTI5dElpd2ljM1ZpSWpvaU1UWWlMQ0p5YjJ4bGN5STZXeUpCWkcxcGJpSmRMQ0p5YjJ4bElqb2lNU0lzSW1saGRDSTZNVGN5TlRBd01EVXlNQ3dpWlhod0lqb3hOekkxTURBeE56SXdmUS5LSjJfbm1jY29JdkVVWmNrTlZ5Mkt0UkFOX284WVFyOHRTcjFCM0p1X3F3IiwiYnJhbmNoIjoiaGlzMSJ9.Qr0xTEpKwUG3j6JOW1w3bpfvKBOWKwbD%2FXuv7n7J3l0"
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
    cy.contains("button", "Master").click();

    cy.wait(5000);

    cy.contains("button", "Profesi").scrollIntoView().click();

    function searchAndSelectData(dataName) {
      function searchOnPage() {
        return cy.get(".mantine-Table-table").then(($table) => {
          // Cek apakah data yang dicari ada di halaman ini
          if ($table.find("td").text().includes(dataName)) {
            // Jika ditemukan, centang checkbox dan keluar dari fungsi
            cy.contains(".mantine-Table-table tr", dataName)
              .find('input[type="checkbox"]')
              .check();
            return true;
          } else {
            // Jika tidak ditemukan, cek apakah ada halaman berikutnya
            return cy
              .get('button[aria-label="Go to next page"]')
              .then(($nextButton) => {
                if (!$nextButton.is(":disabled")) {
                  // Jika ada halaman berikutnya, klik dan ulangi pencarian
                  cy.wrap($nextButton).click();
                  cy.wait(1000); // Tunggu sejenak agar halaman berikutnya termuat
                  return searchOnPage();
                } else {
                  // Jika tidak ada halaman berikutnya, data tidak ditemukan
                  throw new Error(`${dataName} tidak ditemukan di tabel.`);
                }
              });
          }
        });
      }

      return searchOnPage();
    }

    // Panggil fungsi untuk mencari dan memilih data "Tech QA"
    searchAndSelectData("Tech QA").then(() => {
      // Klik tombol "Ubah" untuk mengedit data yang dipilih
      cy.contains("button", "Ubah").click();

      // Lanjutkan dengan langkah berikutnya untuk melakukan edit
      cy.get('[data-path="profesi_nama"]').clear().type("Tech QA - Edited");
      cy.contains("Simpan").click();

      // Verifikasi perubahan berhasil disimpan
      cy.get(".mantine-Table-table")
        .contains("Perubahan Berhasil")
        .should("be.visible");
    });

    // Klik tombol "Ubah" untuk mengedit data yang dipilih
    cy.contains("button", "Ubah").click();

    // Lanjutkan dengan langkah berikutnya untuk melakukan edit
    cy.get('[data-path="profesi_nama"]').clear().type("Tech QA - Edited");
    cy.contains("Simpan").click();

    // Verifikasi perubahan berhasil disimpan
    cy.get(".mantine-Table-table")
      .contains("Tech QA - Edited")
      .should("be.visible");

    cy.contains("Ubah Profesi").click();
    cy.wait(2000);
  });
});
