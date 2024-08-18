import { proxy, subscribe } from "valtio";
import { GlyphAttributes } from "../types";
import * as tests from './test-fonts';

// Source text for the font

export type FontDataSource = {
    text: string;
};

export const fontDataSource = proxy<FontDataSource>({
    text: tests.defaultFontDataStr,
});

// Font data

type DataUri = {
    mime: string;   // 'application/octet-stream' | 'image/png' | 'application/font-woff2'
    enc?: string;   // charset=utf-8
    base: string;   // base64
    data: string;
};

export type FontData = {
    fontText: string;

    dataUri?: DataUri | undefined | null;
    isUrl?: boolean;

    xmlText: string;
    glyphs: GlyphAttributes[];
};

export const fontData = proxy<FontData>({
    fontText: fontDataSource.text,
    xmlText: '',
    glyphs: [],
});

// Source text for the font parsing

function init() {
    const reDataUri = /^\s*data:(?<mime>[\w\/\+-]*);?(?<enc>(?:charset=[\w-]+)?);?(?<base>base64?),(?<data>[a-z0-9\!\$\&\'\,\(\)\*\+\,\;\=\-\.\_\~\:\@\/\?\%]*)\s*$/i;

    updateUriData();

    function updateUriData() {
        fontData.dataUri = reDataUri.exec(fontDataSource.text)?.groups as DataUri;
    }

    subscribe(fontDataSource, () => {
        fontData.fontText = fontDataSource.text;
    
        updateUriData();
    
        fontData.isUrl = false;
        if (fontData.dataUri) {
            //TODO: add url protocol processing
        }
    });
}

init();
