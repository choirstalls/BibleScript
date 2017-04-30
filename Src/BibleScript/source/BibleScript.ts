
/**
 * Contains all BibleScript functionality.
 */
export namespace BibleScript
{

    /**
     * A reference to a location in scripture.
     */
    export class Reference
    {

        /**
         * The field containing the number of the book.
         */
        private bookField: number = null;

        /**
         * The field containing the name of the book.
         */
        private bookNameField: string = null;

        /**
         * The field containing the number of the chapter.
         */
        private chapterField: number = null;

        /**
         * The field containing the number of the verse.
         */
        private verseField: number = null;

        /**
         * Gets the number of the book.
         * @returns The number of the book.
         */
        public get book(): number
        {
            return this.bookField;
        }

        /**
         * Gets the name of the book.
         * @returns The name of the book.
         */
        public get bookName(): string
        {
            return this.bookNameField;
        }

        /**
         * Gets the number of the chapter.
         * @returns The number of the chapter.
         */
        public get chapter(): number
        {
            return this.chapterField;
        }

        /**
         * Gets the number of the verse.
         * @returns The number of the verse.
         */
        public get verse(): number
        {
            return this.verseField;
        }

        /**
         * Initializes a new instance of the Reference class.
         * @param {number} book The number of the book.
         * @param {string} bookName The name of the book.
         * @param {number} chapter? The (optional) number of the chapter.
         * @param {number} verse? The (optional) number of the verse.
         */
        constructor(book: number, bookName: string, chapter?: number, verse?: number)
        {
            if (book != null)
            {
                this.bookField = book;

                if (bookName != null)
                {
                    this.bookNameField = bookName;
                }
            }

            if (chapter != null)
            {
                this.chapterField = chapter;
            }

            if (verse != null)
            {
                this.verseField = verse;
            }
        }

        /**
         * Gets a value indicating whether the reference points to a chapter.
         * @returns TRUE, if the reference points to a chapter; otherwise FALSE.
         */
        public isChapter(): boolean
        {
            return false;
        }

        /**
         * Gets a value indicating whether the reference points to a verse.
         * @returns TRUE, if the reference points to a verse; otherwise FALSE.
         */
        public isVerse(): boolean
        {
            return false;
        }

        /**
         * Gets the absolute chapter number.
         * @returns The absolute chapter number.
         */
        public toAbsoluteChapterNumber(): number
        {
            let result: number = null;

            if (this.chapterField != null)
            {
                let book: Book = Repository.books[this.bookField - 1];

                if (book != null)
                {
                    let chapter: Chapter = book.chapters[this.chapterField - 1];

                    if (chapter != null)
                    {
                        result = chapter.absoluteChapterNumber;
                    }
                }
            }

            return result;
        }

        /**
         * Gets the absolute verse number.
         * @returns The absolute verse number.
         */
        public toAbsoluteVerseNumber(): number
        {
            let result: number = null;

            if (this.verseField != null)
            {
                if (this.chapterField != null)
                {
                    let book: Book = Repository.books[this.bookField - 1];

                    if (book != null)
                    {
                        let chapter: Chapter = book.chapters[this.chapterField - 1];

                        if (chapter != null)
                        {
                            let verse: number = chapter.startVerseNumber + this.verseField - 1;

                            result = verse;
                        }
                    }
                }
            }

            return result;
        }

        /**
         * Moves the reference to the start of the book.
         */
        public moveToStartOfBook(): void
        {
        }

        /**
         * Moves the reference to the end of the book.
         */
        public moveToEndOfBook(): void
        {
        }

        /**
         * Moves the reference to the start of the chapter.
         */
        public moveToStartOfChapter(): void
        {
        }

        /**
         * Moves the reference to the end of the chapter.
         */
        public moveToEndOfChapter(): void
        {
        }

        /**
         * Clones the reference.
         * @returns A new reference instance, with the same state as the current reference.
         */
        public clone(): Reference
        {
            return null;
        }

        /**
         * Determines whether the specified reference is equal to the current reference.
         * @param {Reference} reference The reference to be compared with the current reference.
         * @returns TRUE if the specified reference is equal to the current reference; otherwise, FALSE.
         */
        public equals(reference: Reference): boolean
        {
            return ((this.book == reference.book) &&
                (this.chapter == reference.chapter) &&
                (this.verse == reference.verse));
        }
        
        /**
         * Returns a string that represents the current reference.
         * @returns A string that represents the current reference.
         */
        public toString(): string
        {
            let result: string = "";

            result = this.bookName;

            if (this.chapter != null)
            {
                result += " ";
                result += this.chapter;

                if (this.verse != null)
                {
                    result += ":";
                    result += this.verse;
                }
            }

            return result;
        }

        /**
         * Gets the scripture text content, of the reference.
         * @param {ScriptureTextLoadSuccessful} successCallback The callback to be invoked if the text is retrieved successfully.
         * @param {ScriptureTextLoadFailure} failureCallback The callback to be invoked if an error occurs while retrieving the text.
         * @param {string} version? The (optional) version of the Bible, from which the text is to be retrieved. The default is the King James Version (KJV).
         */
        public getText(successCallback: ScriptureTextLoadSuccessful,
            failureCallback: ScriptureTextLoadFailure,
            version?: string): void
        {
            let passage: string = this.toString();

            return NetBibleApi.getText(passage, successCallback, failureCallback, version);
        }

    }

    /**
     * A range of references to locations in scripture.
     */
    export class Range
    {

        /**
         * The field containing the start of the range.
         */
        private startRef: Reference = null;

        /**
         * The field containing the end of the range.
         */
        private endRef: Reference = null;

        /**
         * The start of the range.
         * @returns A Reference, pointing to the start of the range.
         */
        public get start(): Reference
        {
            return this.startRef;
        }

        /**
         * The end of the range.
         * @returns A Reference, pointing to the end of the range.
         */
        public get end(): Reference
        {
            return this.endRef;
        }

        /**
         * Initializes a new instance of the Range class.
         * @param {Reference} start The start of the range.
         * @param {Reference} end? The (optional) end of the range. If this is omitted, the start and the end will be the same.
         */
        public constructor(start: Reference, end?: Reference)
        {
            this.startRef = start;

            if (end != null)
            {
                this.endRef = end;
            }
            else
            {
                this.endRef = this.startRef;
            }
        }

        /**
         * Finds the relationship between the specified range and the current range.
         * @param {Range} target The range with which the current range is to be compared.
         * @returns The Relationship between the given range and the current range.
         */
        public findRelationship(target: Range): Relationship
        {
            let relationship: Relationship = Relationship.None;

            if ((this.startRef.verse == target.startRef.verse) && (this.endRef.verse == target.endRef.verse))
            {
                relationship = Relationship.Identical;
            }
            else if ((this.startRef.verse <= target.startRef.verse) && (this.endRef.verse >= target.endRef.verse))
            {
                relationship = Relationship.Contained;
            }
            else if ((this.startRef.verse >= target.startRef.verse) && (this.endRef.verse <= target.endRef.verse))
            {
                relationship = Relationship.Container;
            }
            else if ((this.startRef.verse < target.startRef.verse) &&
                ((this.startRef.verse >= target.endRef.verse) && (this.endRef.verse < target.endRef.verse)))
            {
                relationship = Relationship.OverlapOverrun;
            }
            else if ((this.endRef.verse > target.endRef.verse) &&
                ((this.endRef.verse < target.startRef.verse) && (this.startRef.verse > target.startRef.verse)))
            {
                relationship = Relationship.OverlapUnderrun;
            }

            return relationship;
        }

        /**
         * Clones the range.
         * @returns A new range instance, with the same state as the current range.
         */
        public clone(): Range
        {
            return null;
        }

        /**
         * Determines whether the specified range is equal to the current range.
         * @param {Range} range The range to be compared with the current range.
         * @returns TRUE if the specified range is equal to the current range; otherwise, FALSE.
         */
        public equals(range: Range): boolean
        {
            return false;
        }
        
        /**
         * Returns a string that represents the current range.
         * @returns A string that represents the current range.
         */
        public toString(): string
        {
            let result: string = "";

            // FIX:!
            result = this.start.toString();
            result += "-";
            result += this.end.toString();

            return result;
        }

        /**
         * Gets the distance between the start and the end of the range.
         * @returns The Distance between the start and the end of the range.
         */
        public getDistance(): Distance
        {
            let distance: Distance = null;


            return distance;
        }
        /**
         * Gets the scripture text content, of the range.
         * @param {ScriptureTextLoadSuccessful} successCallback The callback to be invoked if the text is retrieved successfully.
         * @param {ScriptureTextLoadFailure} failureCallback The callback to be invoked if an error occurs while retrieving the text.
         * @param {string} version? The (optional) version of the Bible, from which the text is to be retrieved. The default is the King James Version (KJV).
         */
        public getText(successCallback: ScriptureTextLoadSuccessful,
            failureCallback: ScriptureTextLoadFailure,
            version?: string): any
        {
            let passage: string = "";

            return NetBibleApi.getText(passage, successCallback, failureCallback, version);
        }

    }

    /**
     * The distance between 2 locations in scriptural texts.
     */
    export class Distance
    {

        /**
         * The number of books.
         * @returns A number representing the number of books.
         */
        public get books(): number
        {
            return 0;
        }

        /**
         * The number of chapters.
         * @returns A number representing the number of chapters.
         */
        public get chapters(): number
        {
            return 0;
        }

        /**
         * The number of verses.
         * @returns A number representing the number of verses.
         */
        public get verses(): number
        {
            return 0;
        }

        /**
         * Initializes a new instance of the Distance class.
         */
        private constructor()
        {
        }

    }

    /**
     * The category of book.
     */
    export enum Category
    {

        /**
         * No category specified.
         */
        None,

        /**
         * The Old Testament.
         */
        OldTestament,

        /**
         * The New Testament.
         */
        NewTestament

    }

    /**
     * The relationship between references.
     */
    export enum Relationship
    {

        /**
         * No relationship.
         */
        None,

        /**
         * The primary reference contains its counterpart - the secondary reference.
         */
        Container,

        /**
         * An overlap exists between the references, with the primary reference starting before the secondary reference.
         */
        OverlapUnderrun,

        /**
         * The primary reference is contained by its counterpart - the secondary reference.
         */
        Contained,

        /**
         * An overlap exists between the references, with the primary reference ending after the secondary reference.
         */
        OverlapOverrun,

        /**
         * The references are identical.
         */
        Identical
    }

    /**
     * The repository of BibleScript data.
     */
    class Repository
    {

        private static bookData: Array<Book> = null;

        public static get books(): Array<Book>
        {
            return Repository.bookData;
        }

        public static ensureInitialized(): void
        {
            if (Repository.bookData == null)
            {
                Repository.bookData = new Array<Book>();

                let bookIndex: number = 0;
                let category: Category = Category.None;

                category = Category.OldTestament;
                Repository.initializeBook(category, 1, ["Genesis", "Gen", "Ge"], [31, 25, 24, 26, 32, 22, 24, 22, 29, 32, 32, 20, 18, 24, 21, 16, 27, 33, 38, 18, 34, 24, 20, 67, 34, 35, 46, 22, 35, 43, 54, 33, 20, 31, 29, 43, 36, 30, 23, 23, 57, 38, 34, 34, 28, 34, 31, 22, 33, 26]);
                Repository.initializeBook(category, 2, ["Exodus", "Exod", "Exo", "Ex"], [22, 25, 22, 31, 23, 30, 29, 28, 35, 29, 10, 51, 22, 31, 27, 36, 16, 27, 25, 26, 37, 30, 33, 18, 40, 37, 21, 43, 46, 38, 18, 35, 23, 35, 35, 38, 29, 31, 43, 38]);
                Repository.initializeBook(category, 3, ["Leviticus", "Lev", "Le"], [17, 16, 17, 35, 19, 30, 38, 36, 24, 20, 47, 8, 59, 57, 33, 34, 16, 30, 37, 27, 24, 33, 44, 23, 55, 46, 34]);
                Repository.initializeBook(category, 4, ["Numbers", "Num", "Nu", "Nm", "Nb"], [54, 34, 51, 49, 31, 27, 89, 26, 23, 36, 35, 16, 33, 45, 41, 50, 13, 32, 22, 29, 35, 41, 30, 25, 18, 65, 23, 31, 40, 16, 54, 42, 56, 29, 34, 13]);
                Repository.initializeBook(category, 5, ["Deuteronomy", "Deut", "De", "Dt", "Deu"], [46, 37, 29, 49, 33, 25, 26, 20, 29, 22, 32, 31, 19, 29, 23, 22, 20, 22, 21, 20, 23, 29, 26, 22, 19, 19, 26, 69, 28, 20, 30, 52, 29, 12]);
                Repository.initializeBook(category, 6, ["Joshua", "Josh", "Js", "Jos"], [18, 24, 17, 24, 15, 27, 26, 35, 27, 43, 23, 24, 33, 15, 63, 10, 18, 28, 51, 9, 45, 34, 16, 33]);
                Repository.initializeBook(category, 7, ["Judges", "Judg", ""], [36, 23, 31, 24, 31, 40, 25, 35, 57, 18, 40, 15, 25, 20, 20, 31, 13, 31, 30, 48, 25]);
                Repository.initializeBook(category, 8, ["Ruth", "Rth", ""], [22, 23, 18, 22]);
                Repository.initializeBook(category, 9, ["1 Samuel", "1 Sam", "1 Sa"], [28, 36, 21, 22, 12, 21, 17, 22, 27, 27, 15, 25, 23, 52, 35, 23, 58, 30, 24, 42, 16, 23, 28, 23, 43, 25, 12, 25, 11, 31, 13]);
                Repository.initializeBook(category, 10, ["2 Samuel", "2 Sam", "2 Sa"], [27, 32, 39, 12, 25, 23, 29, 18, 13, 19, 27, 31, 39, 33, 37, 23, 29, 32, 44, 26, 22, 51, 39, 25]);
                Repository.initializeBook(category, 11, ["1 Kings", "1 Kngs", "1 Ki"], [53, 46, 28, 34, 18, 38, 51, 66, 28, 29, 43, 33, 34, 31, 34, 34, 24, 46, 21, 43, 29, 53]);
                Repository.initializeBook(category, 12, ["2 Kings", "2 Kngs", "1 Ki"], [18, 25, 27, 44, 27, 33, 20, 29, 37, 36, 20, 22, 25, 29, 38, 20, 41, 37, 37, 21, 26, 20, 37, 20, 30]);
                Repository.initializeBook(category, 13, ["1 Chronicles", "1 Chron", "1 Chr"], [54, 55, 24, 43, 26, 81, 40, 40, 44, 14, 47, 40, 14, 17, 29, 43, 27, 17, 19, 8, 30, 19, 32, 31, 31, 32, 34, 21, 30]);
                Repository.initializeBook(category, 14, ["2 Chronicles", "2 Chron", "2 Chr"], [17, 18, 17, 22, 14, 42, 22, 18, 31, 19, 23, 16, 22, 15, 19, 14, 19, 34, 11, 37, 20, 12, 21, 27, 28, 23, 9, 27, 36, 27, 21, 33, 25, 33, 27, 23]);
                Repository.initializeBook(category, 15, ["Ezra", "Ezr", "Ez"], [11, 70, 13, 24, 17, 22, 28, 36, 15, 44]);
                Repository.initializeBook(category, 16, ["Nehemiah", "Nehm", "Neh", "Nh"], [11, 20, 32, 23, 19, 19, 73, 18, 38, 39, 36, 47, 31]);
                Repository.initializeBook(category, 17, ["Esther", "Esth", "Es"], [22, 23, 15, 17, 14, 14, 10, 17, 32, 3]);
                Repository.initializeBook(category, 18, ["Job", "Jb"], [22, 13, 26, 21, 27, 30, 21, 22, 35, 22, 20, 25, 28, 22, 35, 22, 16, 21, 29, 29, 34, 30, 17, 25, 6, 14, 23, 28, 25, 31, 40, 22, 33, 37, 16, 33, 24, 41, 30, 32, 26, 17]);
                Repository.initializeBook(category, 19, ["Psalms", "Pslm", "Ps"], [6, 12, 8, 8, 12, 10, 17, 9, 20, 18, 7, 8, 6, 7, 5, 11, 15, 50, 14, 9, 13, 31, 6, 10, 22, 12, 14, 9, 11, 12, 24, 11, 22, 22, 28, 12, 40, 22, 13, 17, 13, 11, 5, 26, 17, 11, 9, 14, 20, 23, 19, 9, 6, 7, 23, 13, 11, 11, 17, 12, 8, 12, 11, 10, 13, 20, 7, 35, 36, 5, 24, 20, 28, 23, 10, 12, 20, 72, 13, 19, 16, 8, 18, 12, 13, 17, 7, 18, 52, 17, 16, 15, 5, 23, 11, 13, 12, 9, 9, 5, 8, 28, 22, 35, 45, 48, 43, 13, 31, 7, 10, 10, 9, 8, 18, 19, 2, 29, 176, 7, 8, 9, 4, 8, 5, 6, 5, 6, 8, 8, 3, 18, 3, 3, 21, 26, 9, 8, 24, 13, 10, 7, 12, 15, 21, 10, 20, 14, 9, 6]);
                Repository.initializeBook(category, 20, ["Proverbs", "Prov", "Prv", "Pr"], [33, 22, 35, 27, 23, 35, 27, 36, 18, 32, 31, 28, 25, 35, 33, 33, 28, 24, 29, 30, 31, 29, 35, 34, 28, 28, 27, 28, 27, 33, 31]);
                Repository.initializeBook(category, 21, ["Ecclesiastes", "Eccles", "Ecc", "Ec"], [18, 26, 22, 17, 19, 12, 29, 17, 18, 20, 10, 14]);
                Repository.initializeBook(category, 22, ["Song of Solomon", "Song of Songs", "SoS"], [17, 17, 11, 16, 16, 12, 14, 14]);
                Repository.initializeBook(category, 23, ["Isaiah", "Isa", "Is"], [31, 22, 26, 6, 30, 13, 25, 22, 21, 34, 16, 6, 22, 32, 9, 14, 14, 7, 25, 6, 17, 25, 18, 23, 12, 21, 13, 29, 24, 33, 9, 20, 24, 17, 10, 22, 38, 22, 8, 31, 29, 25, 28, 28, 25, 13, 15, 22, 26, 11, 23, 15, 12, 17, 13, 12, 21, 14, 21, 22, 11, 12, 19, 12, 25, 24]);
                Repository.initializeBook(category, 24, ["Jeremiah", "Jer", "Je", "Jr"], [19, 37, 25, 31, 31, 30, 34, 23, 25, 25, 23, 17, 27, 22, 21, 21, 27, 23, 15, 18, 14, 30, 40, 10, 38, 24, 22, 17, 32, 24, 40, 44, 26, 22, 19, 32, 21, 28, 18, 16, 18, 22, 13, 30, 5, 28, 7, 47, 39, 46, 64, 34]);
                Repository.initializeBook(category, 25, ["Lamentations", "Lam", "La"], [22, 22, 66, 22, 22]);
                Repository.initializeBook(category, 26, ["Ezekiel", "Ezek", "Eze", "Ezk"], [28, 10, 27, 17, 17, 14, 27, 18, 11, 22, 25, 28, 23, 23, 8, 63, 24, 32, 14, 44, 37, 31, 49, 27, 17, 21, 36, 26, 21, 26, 18, 32, 33, 31, 15, 38, 28, 23, 29, 49, 26, 20, 27, 31, 25, 24, 23, 35]);
                Repository.initializeBook(category, 27, ["Daniel", "Dan", "Da", "Dn"], [21, 49, 30, 37, 31, 28, 28, 27, 27, 21, 45, 13]);
                Repository.initializeBook(category, 28, ["Hosea", "Hos", "Ho"], [9, 25, 5, 19, 15, 11, 16, 14, 17, 15, 11, 15, 15, 10]);
                Repository.initializeBook(category, 29, ["Joel", "Joe", "Jl"], [20, 32, 21]);
                Repository.initializeBook(category, 30, ["Amos", "Am"], [15, 16, 15, 13, 27, 14, 17, 14, 15]);
                Repository.initializeBook(category, 31, ["Obadiah", "Obad", "Ob"], [21]);
                Repository.initializeBook(category, 32, ["Jonah", "Jnh", "Jon"], [16, 11, 10, 11]);
                Repository.initializeBook(category, 33, ["Micah", "Mic"], [16, 13, 12, 14, 14, 16, 20]);
                Repository.initializeBook(category, 34, ["Nahum", "Nah", "Na"], [14, 14, 19]);
                Repository.initializeBook(category, 35, ["Habakkuk", "Hab", "Ha"], [17, 20, 19]);
                Repository.initializeBook(category, 36, ["Zephaniah", "Zeph", "Zep", "Zp"], [18, 15, 20]);
                Repository.initializeBook(category, 37, ["Haggai", "Hag", "Hg"], [15, 23]);
                Repository.initializeBook(category, 38, ["Zechariah", "Zech", "Zec", "Zc"], [17, 17, 10, 14, 11, 15, 14, 23, 17, 12, 17, 14, 9, 21]);
                Repository.initializeBook(category, 39, ["Malachi", "Mal", "Ml"], [14, 17, 18, 6]);

                category = Category.NewTestament;
                Repository.initializeBook(category, 40, ["Matthew", "Matt", "Mt"], [25, 23, 17, 25, 48, 34, 29, 34, 38, 42, 30, 50, 58, 36, 39, 28, 27, 35, 30, 34, 46, 46, 39, 51, 46, 75, 66, 20]);
                Repository.initializeBook(category, 41, ["Mark", "Mrk", "Mk"], [45, 28, 35, 41, 43, 56, 37, 38, 50, 52, 33, 44, 37, 72, 47, 20]);
                Repository.initializeBook(category, 42, ["Luke", "Luk", "Lk"], [80, 52, 38, 44, 39, 49, 50, 56, 62, 42, 54, 59, 35, 35, 32, 31, 37, 43, 48, 47, 38, 71, 56, 53]);
                Repository.initializeBook(category, 43, ["John", "Jhn", "Jn"], [51, 25, 36, 54, 47, 71, 53, 59, 41, 42, 57, 50, 38, 31, 27, 33, 26, 40, 42, 31, 25]);
                Repository.initializeBook(category, 44, ["Acts", "Ac"], [26, 47, 26, 37, 42, 15, 60, 40, 43, 48, 30, 25, 52, 28, 41, 40, 34, 28, 41, 38, 40, 30, 35, 27, 27, 32, 44, 31]);
                Repository.initializeBook(category, 45, ["Romans", "Rom", "Ro", "Rm"], [32, 29, 31, 25, 21, 23, 25, 39, 33, 21, 36, 21, 14, 23, 33, 27]);
                Repository.initializeBook(category, 46, ["1 Corinthians", "1 Cor", "1 Co"], [31, 16, 23, 21, 13, 20, 40, 13, 27, 33, 34, 31, 13, 40, 58, 24]);
                Repository.initializeBook(category, 47, ["2 Corinthians", "2 Cor", "2 Co"], [24, 17, 18, 18, 21, 18, 16, 24, 15, 18, 33, 21, 14]);
                Repository.initializeBook(category, 48, ["Galatians", "Gal", "Ga"], [24, 21, 29, 31, 26, 18]);
                Repository.initializeBook(category, 49, ["Ephesians", "Ephes", "Eph"], [23, 22, 21, 32, 33, 24]);
                Repository.initializeBook(category, 50, ["Philippians", "Phil", "Php"], [30, 30, 21, 23]);
                Repository.initializeBook(category, 51, ["Colossians", "Col", "Cl"], [29, 23, 25, 18]);
                Repository.initializeBook(category, 52, ["1 Thessalonians", "1 Thess", "1 Th"], [10, 20, 13, 18, 28]);
                Repository.initializeBook(category, 53, ["2 Thessalonians", "2 Thess", "2 Th"], [12, 17, 18]);
                Repository.initializeBook(category, 54, ["1 Timothy", "1 Tim", "1 Ti"], [20, 15, 16, 16, 25, 21]);
                Repository.initializeBook(category, 55, ["2 Timothy", "2 Tim", "2 Ti"], [18, 26, 17, 22]);
                Repository.initializeBook(category, 56, ["Titus", "Tit"], [16, 15, 15]);
                Repository.initializeBook(category, 57, ["Philemon", "Philem", "Phm"], [25]);
                Repository.initializeBook(category, 58, ["Hebrews", "Heb"], [14, 18, 19, 16, 14, 20, 28, 13, 28, 39, 40, 29, 25]);
                Repository.initializeBook(category, 59, ["James", "Jas", "Jm"], [27, 26, 18, 17, 20]);
                Repository.initializeBook(category, 60, ["1 Peter", "1 Pet", "1 Pt"], [25, 25, 22, 19, 14]);
                Repository.initializeBook(category, 61, ["2 Peter", "2 Pet", "2 Pt"], [21, 22, 18]);
                Repository.initializeBook(category, 62, ["1 John", "1 Jhn", "1 Jn"], [10, 29, 24, 21, 21]);
                Repository.initializeBook(category, 63, ["2 John", "2 Jhn", "2 Jn"], [13]);
                Repository.initializeBook(category, 64, ["3 John", "3 Jhn", "3 Jn"], [14]);
                Repository.initializeBook(category, 65, ["Jude", "Jud"], [25]);
                Repository.initializeBook(category, 66, ["Revelation", "Rev", "Re", "Rv"], [20, 29, 22, 11, 14, 17, 17, 13, 21, 11, 19, 17, 18, 20, 8, 21, 18, 24, 21, 15, 27, 21]);
            }
        }

        private static initializeBook(category: Category, number: number, name: Array<string>, chapterVerses: Array<number>): void
        {
            let book: Book = null;
            let priorBook: Book = null;
            let startVerseNumber = 0;

            if (number > 1)
            {
                let priorBookNumber: number = number - 1;
                let priorBookIndex: number = priorBookNumber - 1;

                priorBook = Repository.bookData[priorBookIndex];
            }

            book = new Book(category, number, name, chapterVerses, priorBook);

            Repository.bookData.push(book);
        }

    }

    export class Bible
    {

        private booksField: Array<Book> = null;

        public get books(): Array<Book>
        {
            return this.booksField;
        }

        public static getBible(): Bible
        {
            Repository.ensureInitialized();

            return new Bible(Repository.books);
        }

        public static getRange(rangeSpec: string | RangeSpecification): Range
        {
            Repository.ensureInitialized();
            
            let range: Range = null;
            
            try
            {
                if ((<RangeSpecification>rangeSpec).start !== undefined)
                {
                    let objectSpec: RangeSpecification = <RangeSpecification>rangeSpec;

                    range = Bible.getRangeFromSpecificationObject(objectSpec);
                }
                else
                {
                    let textSpec: string = <string>rangeSpec;

                    range = Bible.getRangeFromSpecificationText(textSpec);
                }
            }
            catch (ex)
            {
                throw new Error("Invalid Bible range specification.");
            }

            return range;
        }
        
        private static getRangeFromSpecificationObject(rangeSpec: RangeSpecification): Range
        {
            return null;
        }
        
        private static getRangeFromSpecificationText(rangeSpec: string): Range
        {
            let range: Range = null;

            let startRef: Reference = null;
            let endRef: Reference = null;

            if (rangeSpec != null)
            {
                if (rangeSpec.length > 0)
                {
                    let rangeSpecArray: Array<string> = rangeSpec.split("-");

                    if (rangeSpecArray.length <= 2)
                    {
                        let reference1: string = rangeSpecArray[0].trim();
                        let reference2: string = rangeSpecArray[1].trim();

                        startRef = Bible.getReferenceFromSpecificationText(reference1);

                        if (startRef != null)
                        {
                            endRef = Bible.getLatterReference(reference2, startRef);
                        }
                    }
                    else
                    {
                        throw new Error("The given text describes an unsupported range; " +
                            "only ranges separated by a single hyphen are supported.");
                    }
                }
            }

            range = new Range(startRef, endRef);

            return range;
        }

        private static getLatterReference(referenceSpec: string, formerReference: Reference): Reference
        {
            let reference: Reference = null;

            let bookName: string = "";
            let chapterNumber: number = null;
            let verseNumber: number = null;

            if (referenceSpec != null)
            {
                if (referenceSpec.length > 0)
                {
                    let referenceSpecArray: Array<string> = referenceSpec.split(":");

                    if (referenceSpecArray.length == 1)
                    {
                        if (isNaN(Number(referenceSpec)))
                        {
                            // looks like a complete reference
                            reference = Bible.getReferenceFromSpecificationText(referenceSpec);
                        }
                        else
                        {
                            // has to be a verse number
                            bookName = formerReference.bookName;
                            chapterNumber = formerReference.chapter;
                            verseNumber = Number(referenceSpec);

                            reference = Bible.getValidatedReference(formerReference.book, chapterNumber, verseNumber);
                        }
                    }
                    else if (referenceSpecArray.length == 2)
                    {
                        verseNumber = Number(referenceSpecArray[1].trim());

                        let chapterSpecArray: Array<string> = referenceSpecArray[0].split(" ");

                        if (chapterSpecArray.length == 1)
                        {
                            bookName = formerReference.bookName;
                            chapterNumber = Number(chapterSpecArray[0]);
                        }
                        else if (chapterSpecArray.length == 2)
                        {
                            bookName = chapterSpecArray[0];
                            chapterNumber = Number(chapterSpecArray[1]);
                        }
                        else
                        {
                            throw new Error("Too many elements, on parsing.");
                        }

                        reference = Bible.getValidatedReference(formerReference.book, chapterNumber, verseNumber);
                    }
                }
            }

            return reference;
        }

        public static getReference(referenceSpec: string | ReferenceSpecification): Reference
        {
            Repository.ensureInitialized();

            let reference: Reference = null;
            
            try
            {
                if ((<ReferenceSpecification>referenceSpec).bookNumber !== undefined)
                {
                    let objectSpec: ReferenceSpecification = <ReferenceSpecification>referenceSpec;

                    reference = Bible.getReferenceFromSpecificationObject(objectSpec);
                }
                else
                {
                    let textSpec: string = <string>referenceSpec;

                    reference = Bible.getReferenceFromSpecificationText(textSpec);
                }
            }
            catch (ex)
            {
                throw new Error("Invalid Bible reference specification.");
            }

            return reference;
        }

        private static getReferenceFromSpecificationText(referenceSpec: string): Reference
        {
            let reference: Reference = null;

            if (referenceSpec != null)
            {
                if (referenceSpec.length > 0)
                {
                    if (referenceSpec.indexOf("-") > -1)
                    {
                        throw new Error("The given text is a range, not a reference. Please use Bible.getRange().");
                    }
                    else
                    {
                        let chapterBreakIndex: number = referenceSpec.lastIndexOf(" ");
                        let bookName: string = referenceSpec.substr(0, chapterBreakIndex);
                        let chapterVerse: string = referenceSpec.substr(chapterBreakIndex);
                        let chapterVerseArray: Array<string> = chapterVerse.split(":");
                        let chapterNumber: number = null;
                        let verseNumber: number = null;

                        if (chapterVerseArray.length >= 1)
                        {
                            chapterNumber = Number(chapterVerseArray[0]);
                        }

                        if (chapterVerseArray.length == 2)
                        {
                            verseNumber = Number(chapterVerseArray[1]);
                        }

                        let book: Book = Bible.getBook(bookName);

                        if (book != null)
                        {
                            reference = Bible.getValidatedReference(book.number, chapterNumber, verseNumber);
                        }
                    }
                }
            }

            return reference;
        }

        private static getReferenceFromSpecificationObject(referenceSpec: ReferenceSpecification): Reference
        {
            let reference: Reference = null;

            let book: Book = Repository.books[referenceSpec.bookNumber - 1];
            let chapter: Chapter = null;
            let verses: number = null;

            if (book != null)
            {
                if (referenceSpec.chapterNumber != null)
                {
                    chapter = book.chapters[referenceSpec.chapterNumber - 1];

                    if (chapter != null)
                    {
                        if (referenceSpec.verseNumber != null)
                        {
                            if (referenceSpec.verseNumber <= chapter.verses)
                            {
                                verses = referenceSpec.verseNumber;
                            }
                        }
                    }
                }
            }

            reference = Bible.getValidatedReference(book.number, referenceSpec.chapterNumber, referenceSpec.verseNumber);
            
            return reference;
        }

        private static getValidatedReference(bookNumber: number, chapterNumber?: number, verseNumber?: number)
        {
            let reference: Reference = null;

            let book: Book = Repository.books[bookNumber - 1];

            let validatedChapterNumber: number = null;
            let validatedVerseNumber: number = null;

            if (bookNumber != null)
            {
                if (chapterNumber != null)
                {
                    if (chapterNumber <= book.chapters.length)
                    {
                        let chapter: Chapter = book.chapters[chapterNumber - 1];

                        if (chapter != null)
                        {
                            validatedChapterNumber = chapter.number;

                            if (verseNumber <= chapter.verses)
                            {
                                validatedVerseNumber = verseNumber;
                            }
                        }
                    }
                }

                reference = new Reference(
                    book.number, 
                    book.canonicalName,
                    validatedChapterNumber, 
                    validatedVerseNumber);
            }

            return reference;
        }

        private static getBook(name: string): Book
        {
            let book: Book = null;

            for (let currentBook of Repository.books)
            {
                for (let bookName of currentBook.name)
                {
                    if (bookName.indexOf(name) > -1)
                    {
                        book = currentBook;

                        break;
                    }
                }

                if (book != null)
                {
                    break;
                }
            }

            return book;
        }

        private constructor(books: Array<Book>)
        {
            this.booksField = books;
        }

    }

    export class Book implements ScriptureBook
    {

        private categoryField: Category = Category.None;
        private numberField: number = 0;
        private nameField: Array<string> = null;
        private chaptersField: Array<Chapter> = null;
        private precedingBookField: Book = null;

        private bookVerseCountField: number = 0;
        
        public get category(): Category
        {
            return this.categoryField;
        }

        public get number(): number
        {
            return this.numberField;
        }
                
        public get canonicalName(): string
        {
            return this.name[0];
        }

        public get name(): Array<string>
        {
            return this.nameField;
        }
        
        public get chapters(): Array<Chapter>
        {
            return this.chaptersField;
        }
        
        public get precedingBook(): Book
        {
            return this.precedingBookField;
        }

        public get verseCount(): number
        {
            return this.bookVerseCountField;
        }
             
        public get startChapterNumber(): number
        {
            return this.chapters[0].absoluteChapterNumber;
        }
        
        public get endChapterNumber(): number
        {
            return this.chapters[this.chapters.length - 1].absoluteChapterNumber;
        }
     
        public get startVerseNumber(): number
        {
            return this.chapters[0].startVerseNumber;
        }
        
        public get endVerseNumber(): number
        {
            return this.chapters[this.chapters.length - 1].endVerseNumber;
        }

        constructor(category: Category, number: number, name: Array<string>, chapterVerses: Array<number>, precedingBook: Book)
        {
            this.categoryField = category;
            this.numberField = number;
            this.nameField = name;
            this.chaptersField = new Array<Chapter>();
            this.precedingBookField = precedingBook;

            let totalChapterCount: number = 0;
            let totalVerseCount: number = 0;
            let totalBookVerseCount: number = 0;

            if (precedingBook != null)
            {
                totalChapterCount = precedingBook.endChapterNumber;
                totalVerseCount = precedingBook.endVerseNumber;
            }

            for (let chapterIndex: number = 0; chapterIndex < chapterVerses.length; chapterIndex++)
            {
                totalChapterCount++;

                let chapterVerseCount: number = chapterVerses[chapterIndex];

                let chapter: Chapter = new Chapter(chapterIndex + 1, totalChapterCount, totalVerseCount + 1, chapterVerseCount, this);

                totalVerseCount += chapterVerseCount;
                totalBookVerseCount += chapterVerseCount;

                this.chaptersField.push(chapter);
            }

            this.bookVerseCountField = totalBookVerseCount;
        }
    }

    export class Chapter
    {

        private numberField: number = 0;
        private versesField: number = 0;

        private absoluteChapterNumberField: number = 0;

        private startVerseNumberField: number = 0;
        private endVerseNumberField: number = 0;

        public get number(): number
        {
            return this.numberField;
        }
        
        public get verses(): number
        {
            return this.versesField;
        }
          
        public get absoluteChapterNumber(): number
        {
            return this.absoluteChapterNumberField;
        }
      
        public get startVerseNumber(): number
        {
            return this.startVerseNumberField;
        }
        
        public get endVerseNumber(): number
        {
            return this.endVerseNumberField;
        }

        constructor(number: number, absoluteChapterNumber: number, startVerseNumber: number, verses: number, nameableBook: ScriptureBook)
        {
            this.numberField = number;
            this.absoluteChapterNumberField = absoluteChapterNumber;
            this.startVerseNumberField = startVerseNumber;
            this.versesField = verses;

            this.endVerseNumberField = this.startVerseNumberField + verses - 1;
        }

    }

    interface ScriptureBook
    {

        canonicalName: string;

        name: Array<string>;

    }

    // call out to https://getbible.net/api
    class NetBibleApi
    {
        /**
         * Gets the text content of the given passage of scripture.
         * @param {string} passage The pass to be retrieved.
         * @param {ScriptureTextLoadSuccessful} successCallback The callback to be invoked if the text is retrieved successfully.
         * @param {ScriptureTextLoadFailure} failureCallback The callback to be invoked if an error occurs while retrieving the text.
         * @param {string} version? The (optional) version of the Bible, from which the text is to be retrieved. The default is the King James Version (KJV).
         */
        public static getText(passage: string,
            successCallback: ScriptureTextLoadSuccessful,
            failureCallback: ScriptureTextLoadFailure,
            version?: string): void
        {
            let xhr: XMLHttpRequest = new XMLHttpRequest();

            let sanitizedVersion: string = "kjv";

            if (version != null)
            {
                sanitizedVersion = version;
            }

            xhr.open("GET", "http://getbible.net/json?passage=" + passage + "?version=" + sanitizedVersion);

            xhr.onload = function ()
            {
                if (xhr.status === 200)
                {
                    successCallback(xhr.response);
                }
                else
                {
                    if (failureCallback != null)
                    {
                        failureCallback(xhr.status);
                    }
                }
            };

            xhr.send();
        }

    }

    export interface ReferenceSpecification
    {

        bookNumber: number;

        chapterNumber: number;

        verseNumber: number;

    }

    export interface RangeSpecification
    {

        start: ReferenceSpecification;

        end: ReferenceSpecification;

    }

    interface ScriptureTextLoadSuccessful
    {
        (text: any): void;
    }

    interface ScriptureTextLoadFailure
    {
        (errorDetails: any): void;
    }

}