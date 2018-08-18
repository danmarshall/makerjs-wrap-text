var makerjs = require('makerjs');
var opentype = require('opentype.js');
var computeLayout = require('opentype-layout');

function wrapText(font, text, fontSize, width, align, lineHeight) {

    var layoutOptions = { align, lineHeight, width };

    var layout = computeLayout(font, text, layoutOptions);

    layout.glyphs.forEach((glyph, i) => {
        var character = makerjs.models.Text.glyphToModel(glyph.data, fontSize);
        character.origin = makerjs.point.mirror(glyph.position, false, true);
        makerjs.model.addModel(this, character, i);
    })
}

wrapText.metaParameters = [
    { title: "font", type: "font", value: "*" },
    { title: "text", type: "text", value: "Hello" },
    { title: "font size", type: "range", min: 10, max: 200, value: 72 },
    { title: "width", type: "range", min: 100, max: 1000, value: 300 },
    { title: "align", type: "select", value: ["left", "right"] },
    { title: "line height", type: "range", min: 10, max: 400, value: 100 }
];

module.exports = wrapText;
