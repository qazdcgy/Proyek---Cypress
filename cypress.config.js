const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on("task", {
        async getOtp() {
          const { getOtpFromEmail } = require("./cypress/plugins/fetchOtp");
          const otp = await getOtpFromEmail();
          return otp;
        },
      });
    },
  },
});
