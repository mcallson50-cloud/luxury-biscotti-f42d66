export function contactEmailUrl(
  recipient: string,
  fields: { name: string; email: string; subject: string; message: string },
): string {
  const body = `Name: ${fields.name.trim()}\nEmail: ${fields.email.trim()}\n\n${fields.message.trim()}`
  return `mailto:${recipient}?subject=${encodeURIComponent(fields.subject)}&body=${encodeURIComponent(body)}`
}
