function ampel_ein () {
    let ROT = 0
    amp_seite += 1
    // amp_seite=(amp_seite + 1) % 2;
    A = amp_seite % 2
    B = (amp_seite + 1) % 2
    licht(A, ROT, 1)
    licht(B, GRUN, 1)
    basic.showNumber(amp_seite % 2)
    basic.pause(lang)
    for (let index = 0; index < 4; index++) {
        licht(B, GRUN, 0)
        basic.pause(kurz_blink)
        licht(B, GRUN, 1)
        basic.pause(kurz_blink)
    }
    licht(B, GRUN, 0)
    basic.pause(kurz_blink)
    licht(A, GELB, 1)
    licht(B, GELB, 1)
    basic.pause(kurz)
    licht(A, ROT, 0)
    licht(A, GELB, 0)
    licht(B, GELB, 0)
    basic.pause(Math.round(kurz_blink / 3 * 2))
}
function licht (amp_nr: number, lampe: number, ein: number) {
    a_ampeln[amp_nr].setPixelColor(lampe, neopixel.colors(a_farben[lampe]) * ein)
    a_ampeln[amp_nr].show()
}
input.onButtonPressed(Button.A, function () {
    norm_modus = true
})
function ampel_warn () {
    gelb_modus = !(gelb_modus)
    let ein_aus = gelb_modus ? 1 : 0
licht(A, GELB, ein_aus)
    licht(B, GELB, ein_aus)
    basic.pause(kurz_blink)
}
function init () {
    gelb_modus = true
    norm_modus = true
    a_farben = [NeoPixelColors.Red, NeoPixelColors.Yellow, NeoPixelColors.Green]
    lang = 8000
    kurz = 1500
    kurz_blink = 500
    ampel_v = neopixel.create(DigitalPin.P0, 3, NeoPixelMode.RGB)
    ampel_v.showColor(neopixel.colors(NeoPixelColors.Black))
    ampel_l = neopixel.create(DigitalPin.P1, 3, NeoPixelMode.RGB)
    ampel_l.showColor(neopixel.colors(NeoPixelColors.Black))
    a_ampeln = [ampel_v, ampel_l]
}
input.onButtonPressed(Button.B, function () {
    norm_modus = false
})
function blink_licht (amp_nr: number, lampe: number, farbe: number) {
    a_ampeln[amp_nr].setPixelColor(lampe, neopixel.colors(a_farben[lampe]))
    a_ampeln[amp_nr].show()
}
let ampel_l: neopixel.Strip = null
let ampel_v: neopixel.Strip = null
let norm_modus = false
let a_ampeln: neopixel.Strip[] = []
let kurz = 0
let kurz_blink = 0
let lang = 0
let B = 0
let A = 0
let amp_seite = 0
let GRUN = 0
let GELB = 0
let a_farben: number[] = []
let ampel_v_l = 0
let gelb_modus = false
GELB = 1
GRUN = 2
basic.showIcon(IconNames.No)
init()
basic.forever(function () {
    if (norm_modus) {
        ampel_ein()
    } else {
        ampel_warn()
    }
})
