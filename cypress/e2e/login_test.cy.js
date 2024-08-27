describe("Login HRIS", () => {
  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.window().then((win) => {
      win.sessionStorage.clear();
    });
  });

  const visitLoginPage = () => {
    cy.visit("https://hcm-dev.trustmedis.net/");
    cy.wait(500);
  };

  const fillLoginForm = (email, password) => {
    cy.fillInput('[data-cy="email"]', email);
    cy.fillInput('[data-cy="password"]', password);
  };

  const selectBranch = (branchName) => {
    cy.get('[data-cy="branch"]')
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.get('[role="presentation"]')
      .should("be.visible")
      .contains(branchName)
      .click();
  };

  const submitLoginForm = () => {
    cy.get('[data-cy="submit"]').click();
  };

  const enterOtp = (otpCode) => {
    if (otpCode) {
      cy.get(".mantine-PinInput-input").each((input, index) => {
        cy.wrap(input).type(otpCode.charAt(index));
      });

      cy.get('[data-cy="submit"]').click();
    } else {
      throw new Error("OTP not found");
    }
  };

  it("Login and Logout Success", () => {
    visitLoginPage();

    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi1");
    selectBranch("HIS 1");
    submitLoginForm();

    cy.get(".mantine-Modal-body").contains("Okay").should("be.visible");
    cy.contains("button", "Okay").click();

    cy.task("getOtp").then((otpCode) => {
      enterOtp(otpCode);
    });

    cy.wait(5000);
    cy.get('a[href="/dashboard/profile"] button')
      .should("be.visible")
      .and("not.be.disabled")
      .click();

    cy.get('button[data-variant="outline"][type="submit"]')
      .contains("Logout")
      .click();
  });

  it("Email Kosong", () => {
    visitLoginPage();
    fillLoginForm("", "!Konfirmasi1");

    selectBranch("HIS 1");
    submitLoginForm();
  });

  it("Email tidak valid", () => {
    visitLoginPage();
    fillLoginForm("wahyudi", "!Konfirmasi1");

    selectBranch("HIS 1");
    submitLoginForm();
  });

  it("Email tidak Terdaftar", () => {
    visitLoginPage();
    fillLoginForm("tidakdaftar@gmail.com", "!Konfirmasi1");

    selectBranch("HIS 1");
    submitLoginForm();

    cy.contains("p", "Gagal Masuk").should("be.visible");
  });

  it("Password Kosong", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "");

    selectBranch("HIS 1");
    submitLoginForm();
  });

  it("Password Salah", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi2");

    selectBranch("HIS 1");
    submitLoginForm();

    cy.contains("p", "Gagal Masuk").should("be.visible");
  });

  it("Tampilkan Password", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi2");

    cy.get(".mantine-PasswordInput-visibilityToggle").click();

    cy.get('[data-cy="password"]').should("have.attr", "type", "text");
  });

  it("Cabang Kosong", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi1");

    submitLoginForm();
  });

  it("OTP Kosong", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi1");

    selectBranch("HIS 1");
    submitLoginForm();

    cy.contains("button", "Okay").click();
    cy.get('[data-cy="submit"]').click();
  });

  it("OTP Salah", () => {
    visitLoginPage();
    fillLoginForm("newbie2346@gmail.com", "!Konfirmasi1");

    selectBranch("HIS 1");
    submitLoginForm();

    cy.contains("button", "Okay").click();

    cy.get(".mantine-PinInput-input").each((input, index) => {
      const incorrectOtp = "12345";
      cy.wrap(input).type(incorrectOtp.charAt(index));
    });

    cy.get('[data-cy="submit"]').click();

    cy.contains("p", "OTP Verifikasi Gagal").should("be.visible");
  });
});
