function getURI(fName) {
    return 'musicRepo/Radio/' + encodeURI(fName);
}

var PLTracks = [
    {
        url: getURI('JingleHirsute.ogg'),
        artist: 'Some music from the 4.0 Artists. Enjoy!',
        title: 'MFP - 109.9 FM'
    },
    {
        url: getURI('Schubert HipHop - King Charles.mp3'),
        artist: 'King Charles & Alma',
        title: 'Schubert HipHop'
    },
    {
        url: getURI('HesitationBlues.mp3'),
        artist: 'A cordes et à cris',
        title: 'Hesitation Blues'
    },
    {
        url: getURI('One Note Dub.mp3'),
        artist: 'Alma',
        title: 'One Note Dub'
    },
    {
        url: getURI('Drowning Breaks.mp3'),
        artist: 'DJ Drowning (Berlin)',
        title: 'Drowning Breaks - An introductory mix'
    },
    {
        url: getURI('RadioScan.ogg'),
        artist: 'With Marcello & friends, the sound never stops...',
        title: 'You want more?? Stay tune!'
    },
    {
        url: getURI('Corbac Dub.mp3'),
        artist: 'Von Spiel & Alma',
        title: 'Corbac Dub'
    },
    {
        url: getURI('IfYouCare.mp3'),
        artist: 'A cordes et à cris',
        title: 'If you care fort ss rev breath'
    },
    {
        url: getURI('Zart aber fair - Budi Brudis.mp3'),
        artist: 'Budi Brudis',
        title: 'Zart aber fair'
    },
    {
        url: getURI('Nox Dolorosa.mp3'),
        artist: 'Von Spiel & Alma',
        title: 'Nox Dolorosa'
    },
    {
        url: getURI('Nouveau Départ.mp3'),
        artist: 'CCH - Don Vito Remix',
        title: 'Nouveau Départ'
    },
    {
        url: getURI('Nya Trip - A Man Was Killed.mp3'),
        artist: 'Von Spiel & Alma',
        title: 'Nya Trip - A Man Was Killed'
    },
    {
        url: getURI('Afrux2B (aka vive la drogue).mp3'),
        artist: 'Von Spiel & Alma',
        title: 'Afrux 2B - demo'
    },
   
    {
        url: getURI('Tu sers à rien.mp3'),
        artist: 'Un homme seul',
        title: 'Tu sers à rien'
    },
    {
        url: getURI('Magic Mushrooms (Analog teen sound).mp3'),
        artist: 'Analog teen sound with DnB',
        title: 'Magic Mushrooms'
    },
    {
        url: getURI('JingleFini.ogg'),
        artist: 'you: if you want to be part, get involved',
        title: 'That\'s all for now'
    },
];

module.exports = {
    PLTracks,
};