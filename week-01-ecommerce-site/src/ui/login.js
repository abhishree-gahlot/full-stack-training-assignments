import AuthService from "../services/user/AuthServices.js";

const customerForm = document.getElementById("customer-login-form");
const adminForm = document.getElementById("admin-login-form");

const displayLoginError = (loginForm, errorMessage) => {
  const errorMessageElement = loginForm.parentElement.querySelector(".login-error");
  errorMessageElement.textContent = errorMessage;
  errorMessageElement.classList.remove("d-none");
};

customerForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const customerEmail = document.getElementById("customer-email").value.trim();
  const customerPassword = document.getElementById("customer-password").value.trim();

  toggleLoader(customerForm, true);

  try {
    await AuthService.login(customerEmail, customerPassword, "customer");
    window.location.href = "index.html";
  } catch (error) {
    displayLoginError(customerForm, error.message);
  } finally {
    toggleLoader(customerForm, false);
  }
});


adminForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const adminEmail = document.getElementById("admin-email").value.trim();
  const adminPassword = document.getElementById("admin-password").value.trim();

  toggleLoader(adminForm, true);

  try {
    await AuthService.login(adminEmail, adminPassword, "admin");
    window.location.href = "admin.html";
  } catch (error) {
    displayLoginError(adminForm, error.message);
  } finally {
    toggleLoader(adminForm, false);
  }
});

const toggleLoader = (form, show) => {
  const loader = form.querySelector(".login-loader");
  const button = form.querySelector("button");

  if (show) {
    loader.classList.remove("d-none");
    button.disabled = true;
  } else {
    loader.classList.add("d-none");
    button.disabled = false;
  }
};