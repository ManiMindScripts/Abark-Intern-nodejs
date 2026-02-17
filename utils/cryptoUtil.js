import crypto from "crypto"
  
export const hashString = (str) => {
return crypto.createHash("sha256").update(str).digest("hex")
}
