const JOIN_CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789'; // excludes easily confused characters

export function generateId(): string {
  return crypto.randomUUID();
}

export function generateJoinCode(): string {
  const bytes = crypto.getRandomValues(new Uint8Array(6));
  let code = '';
  for (const byte of bytes) {
    code += JOIN_CODE_CHARS[byte % JOIN_CODE_CHARS.length];
  }
  return code;
}
