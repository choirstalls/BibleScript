
import JSBibleImport = require("../source/BibleScript");

import Bible = JSBibleImport.BibleScript.Bible;
import Book = JSBibleImport.BibleScript.Book;
import Category = JSBibleImport.BibleScript.Category;
import Chapter = JSBibleImport.BibleScript.Chapter;
import Range = JSBibleImport.BibleScript.Range;
import Reference = JSBibleImport.BibleScript.Reference;
import Relationship = JSBibleImport.BibleScript.Relationship;

export namespace BibleScript
{

    export class Tests
    {

        public get systemUnderTest(): any
        {
            return JSBibleImport.BibleScript;
        }

        public execute(): void
        {
            try
            {
                this.testChapterCount();
                this.testVerseCount();
                this.testReferenceCreationText();
                this.testRangeCreationTextForV();
                this.testRangeCreationTextForCv();
                this.testRangeCreationTextForBcv();
            }
            catch (ex)
            {
                console.log("BibleScript test suite failed!", ex);

                throw ex;
            }
        }

        private testChapterCount(): void
        {
            let bible: Bible = Bible.getBible();

            let index: number = 0;

            for (var book of TestData.ChapterVerseTotals)
            {
                let bibleBook: Book = bible.books[index];

                Assert.areEqual(book.chapters, bibleBook.chapters.length,
                    "Test failed [testChapterCount] - mismatched chapter count @ '" + book.name + "'.");

                index++;
            }
        }

        private testVerseCount(): void
        {
            let bible: Bible = Bible.getBible();

            let index: number = 0;

            for (var book of TestData.ChapterVerseTotals)
            {
                let bibleBook: Book = bible.books[index];

                Assert.areEqual(book.verses, bibleBook.verseCount,
                    "Test failed [testVerseCount] - mismatched verse count @ '" + book.name + "'.");

                index++;
            }
        }

        private testReferenceCreationText(): void
        {
            let reference: Reference = Bible.getReference("Genesis 1:3");

            Assert.isNotNull(reference);
            Assert.areEqual(reference.book, 1);
            Assert.areEqual(reference.bookName, "Genesis");
            Assert.areEqual(reference.chapter, 1);
            Assert.areEqual(reference.verse, 3);
            Assert.areEqual(reference.toAbsoluteChapterNumber(), 1);
            Assert.areEqual(reference.toAbsoluteVerseNumber(), 3);
            Assert.areEqual(reference.toString(), "Genesis 1:3");
        }

        private testRangeCreationTextForV(): void
        {
            let range: Range = Bible.getRange("Genesis 1:3-10");
            
            Assert.isNotNull(range);
            Assert.isNotNull(range.start);
            Assert.areEqual(range.start.book, 1);
            Assert.areEqual(range.start.bookName, "Genesis");
            Assert.areEqual(range.start.chapter, 1);
            Assert.areEqual(range.start.verse, 3);
            Assert.areEqual(range.start.toAbsoluteChapterNumber(), 1);
            Assert.areEqual(range.start.toAbsoluteVerseNumber(), 3);
            
            Assert.isNotNull(range.end);
            Assert.areEqual(range.end.book, 1);
            Assert.areEqual(range.end.bookName, "Genesis");
            Assert.areEqual(range.end.chapter, 1);
            Assert.areEqual(range.end.verse, 10);
            Assert.areEqual(range.end.toAbsoluteChapterNumber(), 1);
            Assert.areEqual(range.end.toAbsoluteVerseNumber(), 10);
        }

        private testRangeCreationTextForCv(): void
        {
            let range: Range = Bible.getRange("Genesis 1:3-2:10");
            
            Assert.isNotNull(range);
            Assert.isNotNull(range.start);
            Assert.areEqual(range.start.book, 1);
            Assert.areEqual(range.start.bookName, "Genesis");
            Assert.areEqual(range.start.chapter, 1);
            Assert.areEqual(range.start.verse, 3);
            Assert.areEqual(range.start.toAbsoluteChapterNumber(), 1);
            Assert.areEqual(range.start.toAbsoluteVerseNumber(), 3);
            
            Assert.isNotNull(range.end);
            Assert.areEqual(range.end.book, 1);
            Assert.areEqual(range.end.bookName, "Genesis");
            Assert.areEqual(range.end.chapter, 2);
            Assert.areEqual(range.end.verse, 10);
            Assert.areEqual(range.end.toAbsoluteChapterNumber(), 2);
            Assert.areEqual(range.end.toAbsoluteVerseNumber(), 41);
        }
        
        private testRangeCreationTextForBcv(): void
        {
            let range: Range = Bible.getRange("Genesis 1:3-Genesis 3:10");
            
            Assert.isNotNull(range);
            Assert.isNotNull(range.start);
            Assert.areEqual(range.start.book, 1);
            Assert.areEqual(range.start.bookName, "Genesis");
            Assert.areEqual(range.start.chapter, 1);
            Assert.areEqual(range.start.verse, 3);
            Assert.areEqual(range.start.toAbsoluteChapterNumber(), 1);
            Assert.areEqual(range.start.toAbsoluteVerseNumber(), 3);
            
            Assert.isNotNull(range.end);
            Assert.areEqual(range.end.book, 1);
            Assert.areEqual(range.end.bookName, "Genesis");
            Assert.areEqual(range.end.chapter, 3);
            Assert.areEqual(range.end.verse, 10);
            Assert.areEqual(range.end.toAbsoluteChapterNumber(), 3);
            Assert.areEqual(range.end.toAbsoluteVerseNumber(), 66);
        }

    }

    class TestData
    {

        public static readonly ChapterVerseTotals: Array<any> = [
            { name: "Genesis", chapters: 50, verses: 1533 },
            { name: "Exodus", chapters: 40, verses: 1213 },
            { name: "Leviticus", chapters: 27, verses: 859 },
            { name: "Numbers", chapters: 36, verses: 1288 },
            { name: "Deuteronomy", chapters: 34, verses: 959 },
            { name: "Joshua", chapters: 24, verses: 658 },
            { name: "Judges", chapters: 21, verses: 618 },
            { name: "Ruth", chapters: 4, verses: 85 },
            { name: "1 Samuel", chapters: 31, verses: 810 },
            { name: "2 Samuel", chapters: 24, verses: 695 },
            { name: "1 Kings", chapters: 22, verses: 816 },
            { name: "2 Kings", chapters: 25, verses: 719 },
            { name: "1 Chronicles", chapters: 29, verses: 942 },
            { name: "2 Chronicles", chapters: 36, verses: 822 },
            { name: "Ezra", chapters: 10, verses: 280 },
            { name: "Nehemiah", chapters: 13, verses: 406 },
            { name: "Esther", chapters: 10, verses: 167 },
            { name: "Job", chapters: 42, verses: 1070 },
            { name: "Psalms", chapters: 150, verses: 2461 },
            { name: "Proverbs", chapters: 31, verses: 915 },
            { name: "Ecclesiastes", chapters: 12, verses: 222 },
            { name: "Song of Solomon", chapters: 8, verses: 117 },
            { name: "Isaiah", chapters: 66, verses: 1292 },
            { name: "Jeremiah", chapters: 52, verses: 1364 },
            { name: "Lamentations", chapters: 5, verses: 154 },
            { name: "Ezekiel", chapters: 48, verses: 1273 },
            { name: "Daniel", chapters: 12, verses: 357 },
            { name: "Hosea", chapters: 14, verses: 197 },
            { name: "Joel", chapters: 3, verses: 73 },
            { name: "Amos", chapters: 9, verses: 146 },
            { name: "Obadiah", chapters: 1, verses: 21 },
            { name: "Jonah", chapters: 4, verses: 48 },
            { name: "Micah", chapters: 7, verses: 105 },
            { name: "Nahum", chapters: 3, verses: 47 },
            { name: "Habakkuk", chapters: 3, verses: 56 },
            { name: "Zephaniah", chapters: 3, verses: 53 },
            { name: "Haggai", chapters: 2, verses: 38 },
            { name: "Zechariah", chapters: 14, verses: 211 },
            { name: "Malachi", chapters: 4, verses: 55 },
            { name: "Matthew", chapters: 28, verses: 1071 },
            { name: "Mark", chapters: 16, verses: 678 },
            { name: "Luke", chapters: 24, verses: 1151 },
            { name: "John", chapters: 21, verses: 879 },
            { name: "Acts", chapters: 28, verses: 1007 },
            { name: "Romans", chapters: 16, verses: 433 },
            { name: "1 Corinthians", chapters: 16, verses: 437 },
            { name: "2 Corinthians", chapters: 13, verses: 257 },
            { name: "Galatians", chapters: 6, verses: 149 },
            { name: "Ephesians", chapters: 6, verses: 155 },
            { name: "Philippians", chapters: 4, verses: 104 },
            { name: "Colossians", chapters: 4, verses: 95 },
            { name: "1 Thessalonians", chapters: 5, verses: 89 },
            { name: "2 Thessalonians", chapters: 3, verses: 47 },
            { name: "1 Timothy", chapters: 6, verses: 113 },
            { name: "2 Timothy", chapters: 4, verses: 83 },
            { name: "Titus", chapters: 3, verses: 46 },
            { name: "Philemon", chapters: 1, verses: 25 },
            { name: "Hebrews", chapters: 13, verses: 303 },
            { name: "James", chapters: 5, verses: 108 },
            { name: "1 Peter", chapters: 5, verses: 105 },
            { name: "2 Peter", chapters: 3, verses: 61 },
            { name: "1 John", chapters: 5, verses: 105 },
            { name: "2 John", chapters: 1, verses: 13 },
            { name: "3 John", chapters: 1, verses: 14 },
            { name: "Jude", chapters: 1, verses: 25 },
            { name: "Revelation", chapters: 22, verses: 404 }
        ];

    }

    class Assert
    {

        public static areNotEqual(standard: any, actual: any, errorMessage?: string): void
        {
            if (standard == actual)
            {
                let message: string = "Assertion failure (areNotEqual)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

        public static areEqual(standard: any, actual: any, errorMessage?: string): void
        {
            if (standard != actual)
            {
                let message: string = "Assertion failure (areEqual)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

        public static isNull(actual: any, errorMessage?: string): void
        {
            if (actual != null)
            {
                let message: string = "Assertion failure (isNull)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

        public static isNotNull(actual: any, errorMessage?: string): void
        {
            if (actual == null)
            {
                let message: string = "Assertion failure (isNotNull)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

        public static isTrue(actual: boolean, errorMessage?: string): void
        {
            if (actual != true)
            {
                let message: string = "Assertion failure (isTrue)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

        public static isFalse(actual: any, errorMessage?: string): void
        {
            if (actual != false)
            {
                let message: string = "Assertion failure (isFalse)";

                if (errorMessage != null)
                {
                    message += " - " + errorMessage;
                }
                else
                {
                    message += ".";
                }

                throw new Error(message);
            }
        }

    }

}
