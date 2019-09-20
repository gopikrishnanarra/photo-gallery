export default function compressData(uncompressed) {
    const dictionary = {},
        result = [];
    let c,
        wc,
        w = "",
        dictSize = 256
    for (let i = 0; i < 256; i += 1) {
        dictionary[String.fromCharCode(i)] = i;
    }

    for (let i = 0; i < uncompressed.length; i += 1) {
        c = uncompressed.charAt(i);
        wc = w + c;
        if (dictionary.hasOwnProperty(wc)) {
            w = wc;
        } else {
            result.push(dictionary[w]);
            dictionary[wc] = dictSize++;
            w = String(c);
        }
    }
    if (w !== "") {
        result.push(dictionary[w]);
    }
    return result;
}
