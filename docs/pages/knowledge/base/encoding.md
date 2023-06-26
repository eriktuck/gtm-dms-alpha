# Encoding

UTF-8 or LATIN1 are common encodings, where LATIN1 is often used when working with Latin languages (e.g., Spanish, Italian). Google Sheets uses UTF-8, so go with that unless you specifically need LATIN1. 

Google Sheets and Tableau expect encoding UTF-8, data may not display correctly if encoded in another encoding.

When importing data to a Google Sheet from another source (e.g., Excel), use the Import function (File > Import) to add data rather than copy/paste. 

## Set encoding for Mission Database

To set UTF-8 as the database encoding with [psql](psql.md) use the following command. This must be set for each session, as the default is the encoding of your operating system.

```
\encoding UTF8
```

## Determining encoding

Encoding cannot be reliably determined just by looking at a file, unless the encoding is stored in the metadata. Instead, you may need to guess and check. You will often get errors refering to invalid byte sequences if you have the wrong encoding. 

## White listing text

White list text characters before importing if you continue to have encoding errors. In some rare cases, a string might contain a byte sequence that cannot be encoded with your chosen coding scheme and the character does not appear when you review the data in the data source.  

To sanitize an `array_of_strings` in JavaScript, use this [regular expression](https://www.regular-expressions.info/tutorial.html).

```javascript
array_of_strings.map(ele => String(ele).replace(/[^\p{Letter}\p{Mark}\p{Number}.,<>"'\[\]\|+@\/#!¡$%\^&\*;:{}=\-_`~()?¿\s]/gui, ''))
```

`\p{Letter}` is a character class representing all letters and `\p{Mark}` represents the accents and other special characters (this is best practice as opposed to only selecting ASCII characters `[a-zA-Z]`).

`p{Number}` captures all numeric values. 

You can try `p{Punctuation}` for all punctuation, but it includes some punctuation that is non-standard (e.g., left and right single and double quotes). I've listed all punctuation on my keyboard instead, including upside down exclamation and question marks common in Spanish, and escaping characters that have special meaning in regex ( `\[\]\|\^\*\-*\/` ). 

`g` replaces all instances, rather than just the first; `u` allows for use of the Unicode character classes and `i` makes the regex case-insensitive.