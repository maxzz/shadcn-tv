export type FontAttributes = {
    "font-family": string;
    "font-weight": string;
    "font-stretch": string;
    "units-per-em": string;
    "panose-1": string;
    ascent: string;
    descent: string;
    "x-height": string;
    bbox: string;
    "underline-thickness": string;
    "underline-position": string;
    "unicode-range": string;
}

export type GlyphAttributes = {
    "glyph-name": string;
    unicode: string;
    d: string;
}

export type FontDef = {
    "font-face": {
        _attributes: FontAttributes;
    };
    "missing-glyph": {
        _attributes: {
            "horiz-adv-x": string;
            d: string;
        };
    };
    glyph: {
        _attributes: GlyphAttributes;
    }[];
    _attributes: {
        id: string;
        "horiz-adv-x": string;
    };
}

export type Svg = {
    metadata: string;
    defs: {
        font: FontDef;
    };
    _attributes: {
        xmlns: string;
    };
}

export type XmlSvgFile = {
    "?xml": {
        _attributes: {
            version: string;
            standalone: string;
        };
    };
    svg: Svg;
}

/*
const xml: XmlSvgFile = {
    "?xml": {
        _attributes: {
            version: "1.0",
            standalone: "no",
        },
    },
    svg: {
        metadata: "",
        defs: {
            font: {
                "font-face": {
                    _attributes: {
                        "font-family": "Cera Round Pro",
                        "font-weight": "400",
                        "font-stretch": "normal",
                        "units-per-em": "1000",
                        "panose-1": "0 0 5 0 0 0 0 0 0 0",
                        ascent: "808",
                        descent: "-192",
                        "x-height": "0",
                        bbox: "-432 -241 1303 1016",
                        "underline-thickness": "65",
                        "underline-position": "-132",
                        "unicode-range": "U+0020-fb02",
                    },
                },
                "missing-glyph": {
                    _attributes: {
                        "horiz-adv-x": "707",
                        d:
                            "M576 660 q17 0 28.5 -11.5 q11.5 -11.5 11.5 -28.5 l0 -580 q0 -17 -11.5 -28.5 q-11.5 -11.5 -28.5 -11.5 l-446 0 q-16 0 -27.5 11.5 q-11.5 11.5 -11.5 28.5 l0 580 q0 17 11.5 28.5 q11.5 11.5 27.5 11.5 l446 0 ZM558 52 l0 555 l-411 0 l411 -555 Z",
                    },
                },
                glyph: [
                    {
                        _attributes: {
                            "glyph-name": "A",
                            unicode: "A",
                            d:
                                "M622 52 q7 -14 7 -25 q0 -15 -11.5 -26.5 q-11.5 -11.5 -26.5 -11.5 q-25 0 -38 26 l-53 119 l-339 0 l-50 -119 q-11 -26 -37 -26 q-16 0 -27 11.5 q-11 11.5 -11 26.5 q0 10 6 25 l253 592 q12 27 37 27 q25 0 37 -27 l253 -592 ZM332 554 l-142 -350 l280 0 l-138 350 Z",
                        },
                    },
                    {
                        _attributes: {
                            "glyph-name": "B",
                            unicode: "B",
                            d:
                                "M443 363 q61 -18 95 -63 q34 -45 34 -110 q0 -86 -57.5 -138 q-57.5 -52 -151.5 -52 l-231 0 q-18 0 -29.5 12 q-11.5 12 -11.5 29 l0 578 q0 17 11.5 29 q11.5 12 29.5 12 l186 0 q85 0 136.5 -46 q51.5 -46 51.5 -121 q0 -83 -63 -130 ZM310 590 l-141 0 l0 -205 l141 0 q54 0 85 27 q31 27 31 76 q0 48 -30.5 75 q-30.5 27 -85.5 27 ZM355 70 q64 0 100.5 32.5 q36.5 32.5 36.5 89.5 q0 57 -36.5 89.5 q-36.5 32.5 -100.5 32.5 l-186 0 l0 -244 l186 0 Z",
                        },
                    },
                ],
                _attributes: {
                    id: "6.000;MATE;CeraRoundPro-Regular",
                    "horiz-adv-x": "1352",
                },
            },
        },
        _attributes: {
            xmlns: "http://www.w3.org/2000/svg",
        },
    },
};
*/

/* // raw data
{
    "?xml": {
        "_attributes": {
            "version": "1.0",
            "standalone": "no"
        }
    },
    "svg": {
        "metadata": "",
        "defs": {
            "font": {
                "font-face": {
                    "_attributes": {
                        "font-family": "Cera Round Pro",
                        "font-weight": "400",
                        "font-stretch": "normal",
                        "units-per-em": "1000",
                        "panose-1": "0 0 5 0 0 0 0 0 0 0",
                        "ascent": "808",
                        "descent": "-192",
                        "x-height": "0",
                        "bbox": "-432 -241 1303 1016",
                        "underline-thickness": "65",
                        "underline-position": "-132",
                        "unicode-range": "U+0020-fb02"
                    }
                },
                "missing-glyph": {
                    "_attributes": {
                        "horiz-adv-x": "707",
                        "d": "M576 660 q17 0 28.5 -11.5 q11.5 -11.5 11.5 -28.5 l0 -580 q0 -17 -11.5 -28.5 q-11.5 -11.5 -28.5 -11.5 l-446 0 q-16 0 -27.5 11.5 q-11.5 11.5 -11.5 28.5 l0 580 q0 17 11.5 28.5 q11.5 11.5 27.5 11.5 l446 0 ZM558 52 l0 555 l-411 0 l411 -555 Z"
                    }
                },
                "glyph": [
                    {
                        "_attributes": {
                            "glyph-name": "A",
                            "unicode": "A",
                            "d": "M622 52 q7 -14 7 -25 q0 -15 -11.5 -26.5 q-11.5 -11.5 -26.5 -11.5 q-25 0 -38 26 l-53 119 l-339 0 l-50 -119 q-11 -26 -37 -26 q-16 0 -27 11.5 q-11 11.5 -11 26.5 q0 10 6 25 l253 592 q12 27 37 27 q25 0 37 -27 l253 -592 ZM332 554 l-142 -350 l280 0 l-138 350 Z"
                        }
                    },
                    {
                        "_attributes": {
                            "glyph-name": "B",
                            "unicode": "B",
                            "d": "M443 363 q61 -18 95 -63 q34 -45 34 -110 q0 -86 -57.5 -138 q-57.5 -52 -151.5 -52 l-231 0 q-18 0 -29.5 12 q-11.5 12 -11.5 29 l0 578 q0 17 11.5 29 q11.5 12 29.5 12 l186 0 q85 0 136.5 -46 q51.5 -46 51.5 -121 q0 -83 -63 -130 ZM310 590 l-141 0 l0 -205 l141 0 q54 0 85 27 q31 27 31 76 q0 48 -30.5 75 q-30.5 27 -85.5 27 ZM355 70 q64 0 100.5 32.5 q36.5 32.5 36.5 89.5 q0 57 -36.5 89.5 q-36.5 32.5 -100.5 32.5 l-186 0 l0 -244 l186 0 Z"
                        }
                    }
                ],
                "_attributes": {
                    "id": "6.000;MATE;CeraRoundPro-Regular",
                    "horiz-adv-x": "1352"
                }
            }
        },
        "_attributes": {
            "xmlns": "http://www.w3.org/2000/svg"
        }
    }
}
*/