let rättOrd = '';
let maxFel = 7;
let misstag = 0;
let gissning = [];
let ordStatus = null;
// Den här funktionen genererar ett slumpmässigt ord på engelska med hjälp utav en API.
function randomOrd() {
    $.get( "https://random-words-api.vercel.app/word/adjective", function( data ) {

    rättOrd = data[0].word;
});
}
// Den här funktionen skapar tangentbordet med alla bokstaver som användaren kan trycka på för att gissa den bokstaven.
function skapaTangentbord() {
    let buttons = 'abcdefghijklmnopqrstuvwxyz'.split('').map(bokstav =>     
    `<button class="btn btn-lg btn-success m-2" id='` + bokstav + `' onClick="gissa('` + bokstav + `')">` + bokstav + `</button>`).join('');
    document.getElementById('tangentbordDiv').innerHTML = buttons;
}
// Denna funktion kollar det som användaren har gissat.
function gissa(bokstav) {
    rättOrd = rättOrd.toLowerCase();
    gissning.indexOf(bokstav) === -1 ? gissning.push(bokstav) : null;
    document.getElementById(bokstav).setAttribute('disabled', true);
    // Den här if satsen körs om användaren har gissat en bokstav som finns i ordet.
    if (rättOrd.indexOf(bokstav) >= 0) {
        gissatOrd();
        vinst();
    } 
    // denna else if sats körs när användaren har matat in en bokstav som inte fanns i ordet.
    else if (rättOrd.indexOf(bokstav) === -1) {
        misstag++;
        uppdateraMisstag();
        förlust();
        uppdateraBild();
    }
}
// Denna funktion körs när användaren gissar fel. Funktionen uppdaterar bilden med ett steg.
function uppdateraBild() {
    document.getElementById('bild').src = 'Bilder/bild' + misstag + '.png';
}
// Denna funktion kollar om användaren har vunnit när dem lämnar in en funktion.
function vinst() {
    if (ordStatus === rättOrd) {
        document.getElementById('tangentbordDiv').innerHTML = 'Grattis du vann spelet!';
    }
}
// Denna funktion kollar om användarern har förlorat efter dem har lämnat in en gissning.
function förlust() {
    if (misstag === maxFel) {
        document.getElementById('ordet').innerHTML = 'Ordet var: ' + rättOrd;
        document.getElementById('tangentbordDiv').innerHTML = 'Du förlorade spelet!';
    }
}
// Den här funktion visar positionen på bokstaven som man gissade rätt på.
function gissatOrd() {
    ordStatus = rättOrd.split('').map(bokstav => (gissning.indexOf(bokstav) >= 0 ? bokstav : " _ ")).join('');

    document.getElementById('ordet').innerHTML = ordStatus;
}
// Den här funktion finns för att uppdatera misstag räknaren som finns på skärmen när användaren spelar spelet.
function uppdateraMisstag() {
    document.getElementById('misstag').innerHTML = misstag;
}

function startaOm() {
    // Gör så misstag är på 0 och deras gissning är tom.
    misstag = 0;
    gissning = [];
    // Gör så den första bilden kommer tillbaka på skärmen.
    document.getElementById('bild').src = 'Bilder/bild1.png';

    // Kör alla funktioner och tar bort det gammla ordet från skärmen.
    randomOrd();
    uppdateraMisstag();
    skapaTangentbord();
    document.getElementById('ordet').innerHTML = ' ';
}

document.getElementById('maxFel').innerHTML = maxFel;

// Kör alla funktioner för att starta spelet.
randomOrd();
skapaTangentbord();
gissatOrd();
