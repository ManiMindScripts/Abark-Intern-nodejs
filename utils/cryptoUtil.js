const crypto = require("crypto")
 
const hashString = (str) => {
return crypto.createHash("sha256").update(str).digest("hex")
}
module.exports = { hashString };