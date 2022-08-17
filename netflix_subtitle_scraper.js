/************************************************************************************************************
* NETFLIX SUBTITLE SCRAPER
*
* Please use this tool to learn languages for own use.
*
* Develper: BruceWeyne
*
* Usage
* Copy all of these codes and paste them into the console of a browser.
* Start the movie you want to use for learning, its subtitle being scraped at any start timing.
* Type "subtitle;" on the console when the movie finished, and the scraping completed subtitle is output.
* Type "copy($_);" on the console, and the subtitle is copied onto the clipboard.
* Finally, you are free to paste anywhere you want like Evernote or anything.
*
* Type "mo.disconnect();" if you want to stop scraping.
************************************************************************************************************/


/*******************************************************
* Editable settings below
*******************************************************/

var setting = {
    sentenceSeparate: true, // Separate each sentence by blank line
    effectsHide: true, // Hide effect subtitles such as "[Raining sound]"
    playingDebug: true, // Show subtitles to output on the debug console of a browser
    clearConsole: true, // Clear debug console when start scraping
}


/********************************************************
* DO NOT edit the following scritp
********************************************************/

var ancestor = document.querySelector('.player-timedtext');
var previous = '';
var subtitle = '';
var endChars = ['.', '"', '!', '?', ']', '♪'];
var effectChars = ['[', '-[', ']', '(', ')'];

var config = {
    childList: true,               // Detect changes of children nodes, including text nodes
    attributes: false,             // Changes of sttrbutes
    characterData: false,          // Changes of text nodes
    subtree: false,                // Detect changes of grand-children or more
    attributeOldValue: false,      // Record previous attribute value
    characterDataOldValue: false,  // Record previous text node value
    // attributeFilter: [],        // Observe filter to select target attributes with array
}

var mo = new MutationObserver(function(record, observer) {
    var divs  = ancestor.children; // class: player-timedtext-text-container
    var output = '';

    for (var div of divs) {
        var parts = '';
        var spans = div.children[0].children;

        for (var span of spans) {
            var stuff = span.innerText.replace(/\r?\n/g, ''); // Only use for verifying
            if (setting.effectsHide && effectChars.includes(stuff.slice(0,1)) && effectChars.includes(stuff.slice(-1))) continue; // Remove effect subtitles
            if (setting.effectsHide && effectChars.includes(stuff.slice(0,2)) && effectChars.includes(stuff.slice(-1))) continue; // Remove effect subtitles
            if (parts !== '' && endChars.includes(parts.slice(-1))) parts += '\n'; // When ends with finishing symbols
            parts += span.innerText.replace(/\r?\n/g, ' '); // Text value of child node span of span, replacing LF code with space
        }

        if (!parts || parts === '') continue;
        if (output !== '') output += ' '; // Add space when output is set more than twice

        output += parts;
    }
    if (setting.effectsHide && effectChars.includes(output.slice(0,1)) && effectChars.includes(output.slice(-1))) output = ''; // Remove effect subtitles
    if (setting.effectsHide && effectChars.includes(output.slice(0,2)) && effectChars.includes(output.slice(-1))) output = ''; // Remove effect subtitles
    if (previous !== output && output !== '') { // Filter to keep output not duplicated
        if (setting.playingDebug) console.log(output);
        subtitle += output;

        if (endChars.includes(output.slice(-1))) { // When ends with finishing symbols
            if (setting.sentenceSeparate) {
                subtitle += '\n\n';
            } else {
                subtitle += '\n';
            }
        } else { // When still on going
            subtitle += ' ';
        }
    }
    previous = output;
});

mo.observe(ancestor, config); // Excecute Observation

if (setting.clearConsole) clear(); // Clear console

// mo.disconnect(); // Call this to stop observation
