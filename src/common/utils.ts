import { OAUTH } from "./constants.ts";

export function generateRandomString(len: number): string {
  const validCharacters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-._~";
  const validCharactersCount = validCharacters.length;
  let result = "";
  for (let i = 0; i < len; i++) {
    const randomIndex = Math.floor(Math.random() * validCharactersCount);
    result += validCharacters.charAt(randomIndex);
  }
  return result;
}

export const oauth = {
  generateCodeVerifier: (len: number): string => {
    if (
      len < OAUTH.CODE_VERIFIER_MIN_LENGTH ||
      len > OAUTH.CODE_VERIFIER_MAX_LENGTH
    ) {
      throw new Error(
        `Length must be between ${OAUTH.CODE_VERIFIER_MIN_LENGTH} and ${OAUTH.CODE_VERIFIER_MAX_LENGTH} characters.`
      );
    }
    return generateRandomString(len);
  },

  createS256CodeChallenge: (codeVerifier: string): string => {
    return codeVerifier;
  },
};
