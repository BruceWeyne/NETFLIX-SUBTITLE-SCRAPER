# NETFLIX SUBTITLE SCRAPER
Scrape NETFLIX movies' subtitles as playing. For language learning.

# USAGE
1. Copy all of these codes and paste them into the console of a browser.
1. Start the movie you want to use for language learning, its subtitles being scraped at any start timing.
1. Type "subtitle;" on the console when the movie finished, and the scraping completed subtitles are output.
1. Type "copy($_);" on the console, and the subtitles are copied onto the clipboard.
1. Finally, you are free to paste anywhere you want like Evernote or anything.

# SETTING
You can change the setting with editing the "setting" object variable in the Javascritp file.<br>
If you choose some language subtitles like Japanese, it is recommended to set the key "endWithPunctuation" as false because those language subtitles does not use punctuation marks.

|key|explanation|
|-|-|
|endWithPunctuation|When this key is set as false, subtitles will be separated by each displayed sentence. <br>Punctuation does not exist on some language subtitles such as Japanese, Chinese, Korean, Thai and etc.|
|sentenceSeparate|Separate each sentence by blank line|
|effectsHide|Hide effect subtitles such as "[Raining sound]"|
|playingDebug|Show subtitles to output on the debug console of a browser|
|clearConsole|Clear debug console when start scraping|

# Sample for use
https://user-images.githubusercontent.com/47801526/184587501-11ae39cd-41ba-4fab-a2ad-66ae243cefa2.mov

