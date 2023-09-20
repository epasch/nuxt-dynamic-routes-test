/*
 * JavaScript base64 / base64url encoder and decoder
 */

var b64c = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"   // base64 dictionary
var b64u = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"   // base64url dictionary
var b64pad = '='

/* base64_encode_data
 * Internal helper to encode data to base64 using specified dictionary.
 */
function base64_encode_data(data, len, b64x) {
    var dst = ""
    var i

    for (i = 0; i <= len - 3; i += 3)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i+1) >>> 4))
        dst += b64x.charAt(((data.charCodeAt(i+1) & 15) << 2) | (data.charCodeAt(i+2) >>> 6))
        dst += b64x.charAt(data.charCodeAt(i+2) & 63)
    }

    if (len % 3 == 2)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4) | (data.charCodeAt(i+1) >>> 4))
        dst += b64x.charAt(((data.charCodeAt(i+1) & 15) << 2))
        dst += b64pad
    }
    else if (len % 3 == 1)
    {
        dst += b64x.charAt(data.charCodeAt(i) >>> 2)
        dst += b64x.charAt(((data.charCodeAt(i) & 3) << 4))
        dst += b64pad
        dst += b64pad
    }

    return dst
}

/* base64url_encode
 * Encode a JavaScript string to base64url.
 * Specified string is first converted from JavaScript UCS-2 to UTF-8.
 */
export default function (str) {
    var utf8str = encodeURIComponent(str)
    return base64_encode_data(utf8str, utf8str.length, b64u)
}
