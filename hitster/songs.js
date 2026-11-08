/* Catálogo base: título | artista | año de lanzamiento | idioma | género.
   Es una lista curada; el usuario puede sumar sus propias canciones desde la app. */
const SONGS_RAW = `
La Vie en rose|Édith Piaf|1947|fr|pop
Rock Around the Clock|Bill Haley & His Comets|1954|en|rock
Hound Dog|Elvis Presley|1956|en|rock
Volare|Domenico Modugno|1958|it|pop
Johnny B. Goode|Chuck Berry|1958|en|rock
La Bamba|Ritchie Valens|1958|es|rock
Ne me quitte pas|Jacques Brel|1959|fr|balada
Je ne regrette rien|Édith Piaf|1960|fr|balada
Twist and Shout|The Beatles|1963|en|rock
Ring of Fire|Johnny Cash|1963|en|country
(I Can't Get No) Satisfaction|The Rolling Stones|1965|en|rock
Mas que nada|Sérgio Mendes|1966|pt|latin
Gracias a la vida|Violeta Parra|1966|es|balada
Respect|Aretha Franklin|1967|en|rnb
Hey Jude|The Beatles|1968|en|rock
Aux Champs-Élysées|Joe Dassin|1969|fr|pop
Let It Be|The Beatles|1970|en|rock
Oye Cómo Va|Santana|1970|es|rock
Imagine|John Lennon|1971|en|pop
Stairway to Heaven|Led Zeppelin|1971|en|rock
Take Me Home, Country Roads|John Denver|1971|en|country
Mediterráneo|Joan Manuel Serrat|1971|es|balada
Superstition|Stevie Wonder|1972|en|rnb
Libre|Nino Bravo|1972|es|balada
Jolene|Dolly Parton|1973|en|country
Eres tú|Mocedades|1973|es|balada
Porque te vas|Jeanette|1974|es|pop
Bohemian Rhapsody|Queen|1975|en|rock
Hotel California|Eagles|1976|en|rock
Dancing Queen|ABBA|1976|en|disco
Stayin' Alive|Bee Gees|1977|en|disco
Ti amo|Umberto Tozzi|1977|it|pop
Le Freak|Chic|1978|en|disco
I Will Survive|Gloria Gaynor|1978|en|disco
September|Earth, Wind & Fire|1978|en|disco
Don't Stop Me Now|Queen|1978|en|rock
Another Brick in the Wall|Pink Floyd|1979|en|rock
Highway to Hell|AC/DC|1979|en|rock
Gimme! Gimme! Gimme!|ABBA|1979|en|disco
Gloria|Umberto Tozzi|1979|it|pop
La chica de ayer|Nacha Pop|1980|es|rock
Don't Stop Believin'|Journey|1981|en|rock
Thriller|Michael Jackson|1982|en|pop
Beat It|Michael Jackson|1982|en|pop
Eye of the Tiger|Survivor|1982|en|rock
Africa|Toto|1982|en|rock
Felicità|Al Bano & Romina Power|1982|it|pop
Billie Jean|Michael Jackson|1983|en|pop
Sweet Dreams (Are Made of This)|Eurythmics|1983|en|pop
Every Breath You Take|The Police|1983|en|rock
Girls Just Want to Have Fun|Cyndi Lauper|1983|en|pop
Total Eclipse of the Heart|Bonnie Tyler|1983|en|pop
99 Luftballons|Nena|1983|de|pop
L'italiano|Toto Cutugno|1983|it|pop
Like a Virgin|Madonna|1984|en|pop
Purple Rain|Prince|1984|en|rock
Careless Whisper|George Michael|1984|en|pop
Last Christmas|Wham!|1984|en|pop
Take On Me|a-ha|1985|en|pop
Rock Me Amadeus|Falco|1985|de|pop
Livin' on a Prayer|Bon Jovi|1986|en|rock
Persiana Americana|Soda Stereo|1986|es|rock
Hijo de la Luna|Mecano|1986|es|pop
El baile de los que sobran|Los Prisioneros|1986|es|rock
With or Without You|U2|1987|en|rock
Never Gonna Give You Up|Rick Astley|1987|en|pop
Sweet Child O' Mine|Guns N' Roses|1987|en|rock
Bamboleo|Gipsy Kings|1987|es|latin
Ella, elle l'a|France Gall|1987|fr|pop
La incondicional|Luis Miguel|1988|es|balada
Lambada|Kaoma|1989|pt|dance
Nothing Compares 2 U|Sinéad O'Connor|1990|en|pop
Vogue|Madonna|1990|en|pop
Rayando el Sol|Maná|1990|es|rock
De música ligera|Soda Stereo|1990|es|rock
Entre dos tierras|Héroes del Silencio|1990|es|rock
Evidências|Chitãozinho & Xororó|1990|pt|country
Smells Like Teen Spirit|Nirvana|1991|en|rock
Under the Bridge|Red Hot Chili Peppers|1991|en|rock
Enter Sandman|Metallica|1991|en|rock
Me cuesta tanto olvidarte|Mecano|1991|es|pop
I Will Always Love You|Whitney Houston|1992|en|pop
Como la flor|Selena|1992|es|latin
Vivir sin aire|Maná|1992|es|rock
Macarena|Los del Río|1993|es|dance
Lamento boliviano|Enanitos Verdes|1994|es|rock
Bidi Bidi Bom Bom|Selena|1994|es|latin
Wonderwall|Oasis|1995|en|rock
Gangsta's Paradise|Coolio|1995|en|hiphop
Waterfalls|TLC|1995|en|rnb
Con te partirò|Andrea Bocelli|1995|it|balada
Pour que tu m'aimes encore|Céline Dion|1995|fr|pop
María|Ricky Martin|1995|es|latin
Wannabe|Spice Girls|1996|en|pop
La flaca|Jarabe de Palo|1996|es|rock
My Heart Will Go On|Céline Dion|1997|en|pop
Corazón partío|Alejandro Sanz|1997|es|pop
Clavado en un bar|Maná|1997|es|rock
Du hast|Rammstein|1997|de|rock
...Baby One More Time|Britney Spears|1998|en|pop
Believe|Cher|1998|en|dance
Ojos así|Shakira|1998|es|pop
La vida es un carnaval|Celia Cruz|1998|es|latin
Suavemente|Elvis Crespo|1998|es|latin
Smooth|Santana|1999|en|rock
No Scrubs|TLC|1999|en|rnb
Livin' la Vida Loca|Ricky Martin|1999|en|latin
Bailamos|Enrique Iglesias|1999|es|latin
Eres|Café Tacvba|1999|es|rock
Color esperanza|Diego Torres|2001|es|pop
Lose Yourself|Eminem|2002|en|hiphop
Aserejé|Las Ketchup|2002|es|dance
A Dios le pido|Juanes|2002|es|rock
Obsesión|Aventura|2002|es|latin
Hey Ya!|OutKast|2003|en|hiphop
In Da Club|50 Cent|2003|en|hiphop
Crazy in Love|Beyoncé|2003|en|rnb
Mr. Brightside|The Killers|2003|en|rock
Seven Nation Army|The White Stripes|2003|en|rock
Toxic|Britney Spears|2003|en|pop
Gasolina|Daddy Yankee|2004|es|reggaeton
La camisa negra|Juanes|2004|es|pop
La tortura|Shakira|2005|es|pop
Rehab|Amy Winehouse|2006|en|rnb
Te lo agradezco, pero no|Alejandro Sanz|2006|es|pop
Umbrella|Rihanna|2007|en|pop
Stronger|Kanye West|2007|en|hiphop
Viva la Vida|Coldplay|2008|en|rock
Single Ladies (Put a Ring on It)|Beyoncé|2008|en|rnb
Poker Face|Lady Gaga|2008|en|pop
I Gotta Feeling|Black Eyed Peas|2009|en|dance
Bad Romance|Lady Gaga|2009|en|pop
Empire State of Mind|JAY-Z|2009|en|hiphop
Gee|Girls' Generation|2009|ko|pop
Alors on danse|Stromae|2009|fr|dance
Rolling in the Deep|Adele|2010|en|rnb
Firework|Katy Perry|2010|en|pop
Danza Kuduro|Don Omar|2010|es|reggaeton
Party Rock Anthem|LMFAO|2011|en|dance
Somebody That I Used to Know|Gotye|2011|en|pop
Someone Like You|Adele|2011|en|rnb
Titanium|David Guetta|2011|en|dance
Ai Se Eu Te Pego|Michel Teló|2011|pt|latin
Gangnam Style|PSY|2012|ko|dance
Get Lucky|Daft Punk|2013|en|dance
Happy|Pharrell Williams|2013|en|pop
Wake Me Up|Avicii|2013|en|dance
Papaoutai|Stromae|2013|fr|dance
Vivir mi vida|Marc Anthony|2013|es|latin
Propuesta indecente|Romeo Santos|2013|es|latin
Uptown Funk|Mark Ronson|2014|en|pop
Shake It Off|Taylor Swift|2014|en|pop
Bailando|Enrique Iglesias|2014|es|latin
Ay Vamos|J Balvin|2014|es|reggaeton
Dernière danse|Indila|2014|fr|pop
Hotline Bling|Drake|2015|en|hiphop
Hasta la raíz|Natalia Lafourcade|2015|es|pop
Closer|The Chainsmokers|2016|en|dance
Cheap Thrills|Sia|2016|en|pop
Chantaje|Shakira|2016|es|latin
Shape of You|Ed Sheeran|2017|en|pop
Believer|Imagine Dragons|2017|en|rock
Despacito|Luis Fonsi|2017|es|reggaeton
Mi Gente|J Balvin|2017|es|reggaeton
Mayores|Becky G|2017|es|reggaeton
Felices los 4|Maluma|2017|es|reggaeton
Havana|Camila Cabello|2017|en|pop
God's Plan|Drake|2018|en|hiphop
SICKO MODE|Travis Scott|2018|en|hiphop
Fake Love|BTS|2018|ko|pop
Calma|Pedro Capó|2018|es|latin
Te Boté|Casper Mágico|2018|es|reggaeton
Blinding Lights|The Weeknd|2019|en|pop
Bad Guy|Billie Eilish|2019|en|pop
Old Town Road|Lil Nas X|2019|en|hiphop
Dance Monkey|Tones and I|2019|en|pop
Watermelon Sugar|Harry Styles|2019|en|pop
Con Calma|Daddy Yankee|2019|es|reggaeton
Levitating|Dua Lipa|2020|en|pop
Dynamite|BTS|2020|en|pop
How You Like That|BLACKPINK|2020|ko|pop
Dákiti|Bad Bunny|2020|es|reggaeton
Hawái|Maluma|2020|es|reggaeton
drivers license|Olivia Rodrigo|2021|en|pop
Zitti e buoni|Måneskin|2021|it|rock
Pepas|Farruko|2021|es|dance
As It Was|Harry Styles|2022|en|pop
Tití Me Preguntó|Bad Bunny|2022|es|reggaeton
Provenza|Karol G|2022|es|reggaeton
Flowers|Miley Cyrus|2023|en|pop
TQG|Karol G|2023|es|reggaeton
Ella baila sola|Peso Pluma|2023|es|latin
`;

const GENRES = {
  pop: 'Pop', rock: 'Rock', latin: 'Latino / tropical', reggaeton: 'Reggaetón', hiphop: 'Hip-hop',
  dance: 'Electrónica / dance', rnb: 'R&B / soul', disco: 'Disco / funk', balada: 'Baladas', country: 'Country / folk'
};
const LANGS = {
  es: 'Español', en: 'Inglés', pt: 'Portugués', fr: 'Francés', it: 'Italiano', de: 'Alemán', ko: 'Coreano'
};
const SONGS = SONGS_RAW.trim().split('\n').map(l => {
  const [title, artist, year, lang, genre] = l.split('|');
  return { id: title + '|' + artist, title, artist, year: +year, lang, genre };
});
