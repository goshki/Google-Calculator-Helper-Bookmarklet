# Google Calculator Helper Bookmarklet #

## Description ##

This simple helper script let's you embed a little imput box on any page to
quickly ask Google about calculations, currencies and conversion of units.

It consists of two elements:

*   a JavaScript script responsible for the generation of input box
*   a PHP script to receive queries from the JS input box, forward them to
    Google and retrieve results in JSONP format

## Installation ##

To use this helper you have to do the following:

*   upload the ask.php script to your PHP server, say:
    http://myserver.com/services/ask.php
*   in the google-calculator-helper.js script enter URL to your ask.php in the
    ASKPROXY variable (http://myserver.com/services/ask.php in this example)
    then minify the script's code (some minify tools are available online).
    Don't forget to remove new-lines (whole script should be a one-liner).
*   create a new bookmark in your browser and in the URL field enter:
    "javascript:<minified_script_code>" replacing <minified_script_code> with
    the minified script code. :-)
*   for your convenience there is an already minified version of the JavaScript
    script in google-calculator-helper.min.js, just remember to replace the
    ASKPROXY variable

And that's it! If your browser permits, you may define a keyword for your
bookmark so you can quickly access the helper via browser's adress bar.

## Usage ##

Some expamples of queries:

*   ( 5 + 5 ) * 2 - 3 * cos( pi )
*   1 kg in lbs
*   1 m/s in km/h
*   1 horsepower in kilowatts
*   1 megabyte in bytes
*   1 pln in indian rupee

## Tips & tricks ##

*   the buttons are:
    *   = - submit
    *   [] - clear history
    *   x - close helper
*   you can submit query just by pressing ENTER