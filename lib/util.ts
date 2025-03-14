export function slugify(text: string) {
  return text.replace(/\s+/g, '-').toLowerCase();
}
