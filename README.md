# BibleScript

BibleScript is a JavaScript parser for Bible references (written in TypeScript), with additional functionality for comparisons and scripture text retrieval.

## Features

BibleScript can:

* Parse text BCV (Book, Chapter, Verse) specifications, in the following formats:
  * References
    * Genesis
    * Genesis 1
    * Genesis 1:3
  * Ranges
    * Genesis 1:3-10
    * Genesis 1:3-Exodus 2:4
* Convert verse numbers to/from text BCV specifications
* Retrieve the scripture text of References and Ranges, from [GetBible.NET](https://getbible.net/)

## Installation

	bower install biblescript -- save

Once installed, the framework can be loaded as a dependency using an AMD loader, such as [RequireJS](http://requirejs.org/).

## API Overview

An overview of the API is as follows; note that, while access modifiers exist in TypeScript, all members can be directly accessed using JavaScript - hence, the overview below covers only the types which are meant to be accessed directly.

As this is not meant to be exhaustive, it is recommended that you go through the full definition of the API, including JSDoc-annotated documentation, which is available in the [BibleScript TypeScript ambient declarations](https://github.com/choirstalls/BibleScript/blob/master/Src/BibleScript/typings/index.d.ts).

### Bible (Class)

The facade of the framework, the `Bible` class will typically be what you use first.

#### Static Properties/Methods

#### Bible.getBible()

#### Bible.getReference(string)

#### Bible.getRange(string)

#### Instance Properties/Methods

#### Bible.books

This property returns an array of `Book`, representing the books of the bible.

### Reference (Class)

### Range (Class)

### Book (Class)

### Chapter (Class)

### Category (Enumeration)

### Relationship (Enumeration)




