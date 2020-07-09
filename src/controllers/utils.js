export const dedupeDoubleSlashesInUrl = (input) =>
  input.replace(/([^:]\/)\/+/g, "$1");
