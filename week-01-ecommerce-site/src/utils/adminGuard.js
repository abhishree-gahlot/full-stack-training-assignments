import { getUserFromStorage } from "./storage.js";

export function protectAdminPage() {
  const user = getUserFromStorage();

  if (!user || user.role !== "admin") {
    alert("Access denied! Admins only.");
    window.location.replace("login.html");
  }
}
