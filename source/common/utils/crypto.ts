// import CryptoJS from "crypto-js"
// import moment from "moment"

// const generateDateKey = () => {
//   let dateKey = moment().format("YYYYMMDD")
//   dateKey = dateKey.concat(dateKey)
//   console.log("DateKey: ", dateKey)
//   return dateKey
// }

// class CryptoUtils {
//   //随机生成指定数量的16进制key
//   generatekey(num) {
//     const library =
//       "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
//     let key = ""
//     for (let i = 0; i < num; i++) {
//       const randomPoz = Math.floor(Math.random() * library.length)
//       key += library.substring(randomPoz, randomPoz + 1)
//     }
//     return key
//   }
//   //AES加密
//   encrypt(word, keyStr = "") {
//     keyStr = keyStr ? keyStr : generateDateKey() //判断是否存在ksy，不存在就用定义好的key
//     const key = CryptoJS.enc.Utf8.parse(keyStr)
//     const srcs = CryptoJS.enc.Utf8.parse(word)
//     const encrypted = CryptoJS.AES.encrypt(srcs, key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     })
//     return encrypted.toString()
//   }
//   //AES解密
//   decrypt(word, keyStr = "") {
//     keyStr = keyStr ? keyStr : generateDateKey()
//     const key = CryptoJS.enc.Utf8.parse(keyStr) // 解密的时候 必须使用utf8的格式
//     const decrypt = CryptoJS.AES.decrypt(word, key, {
//       mode: CryptoJS.mode.ECB,
//       padding: CryptoJS.pad.Pkcs7
//     })
//     return CryptoJS.enc.Utf8.stringify(decrypt).toString()
//   }
//   //DES加密
//   encryptDes(message, key) {
//     const keyHex = CryptoJS.enc.Utf8.parse(key)
//     const option = { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 }
//     const encrypted = CryptoJS.DES.encrypt(message, keyHex, option)
//     return encrypted.ciphertext.toString()
//   }
//   //DES解密
//   decryptDes(message, key) {
//     const keyHex = CryptoJS.enc.Utf8.parse(key)
//     const decrypted = CryptoJS.DES.decrypt(
//       {
//         ciphertext: CryptoJS.enc.Hex.parse(message)
//       },
//       keyHex,
//       {
//         mode: CryptoJS.mode.ECB,
//         padding: CryptoJS.pad.Pkcs7
//       }
//     )
//     return decrypted.toString(CryptoJS.enc.Utf8)
//   }
// }
