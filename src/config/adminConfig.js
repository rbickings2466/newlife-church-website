// Comma separated admin emails in env: VITE_ADMIN_EMAILS="admin1@example.com,admin2@example.com"
export const adminEmails = (import.meta.env.VITE_ADMIN_EMAILS || "")
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email) {
  if (!email) return false;
  return adminEmails.includes(email.toLowerCase());
}
