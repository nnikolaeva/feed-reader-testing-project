/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */
/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
     * a related set of tests. This suite is all about the RSS
     * feeds definitions, the allFeeds variable in our application.
     */
    describe('RSS Feeds', function() {
        /* tests that the allFeeds variable has been defined
         * and that it is not empty. 
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* tests loops through each feed in the allFeeds object
         * and ensures it has a URL defined and that the URL is not empty.
         */
        it('contains defined URL', function() {
            var allFeedsLength = allFeeds.length;
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            }
        });

        /* test loops through each feed in the allFeeds object
         * and ensures it has a name defined and that the name is not empty.
         */
        it('contains defined name', function() {
            var allFeedsLength = allFeeds.length;
            for (var i = 0; i < allFeedsLength; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            }
        });
    });

    describe('The menu', function() {
        /* test ensures the menu element is hidden by default. 
         */
        it('hidden by default', function() {
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });

        /* test ensures that the menu changes
         * visibility when the menu icon is clicked. 
         */
        it('changes visibility when the menu icon is clicked', function() {
            $('.menu-icon-link').click();
            expect($('body').hasClass("menu-hidden")).toBe(false);

            $('.menu-icon-link').click();
            expect($('body').hasClass("menu-hidden")).toBe(true);
        });
    });

    /* test that ensures when the loadFeed
     * function is called and completes its work, there is at least
     * a single .entry element within the .feed container.
     */
    describe('Initial Entries', function() {
        function testFeedContainsEntry(index, name) {
            beforeEach(function(done) {
                loadFeed(index, function() {
                    done();
                });
            });
            it("\"" + name + "\"" + ' feed contains entry element', function(done) {
                expect($('.feed .entry-link').length).not.toBe(0);
                done();
            });
        }

        var allFeedsLength = allFeeds.length;
        for (var i = 0; i < allFeedsLength; i++) {
            testFeedContainsEntry(i, allFeeds[i].name);
        }
    });

    /* test that ensures when a new feed is loaded
     * by the loadFeed function that the content actually changes.
     */
    describe('New Feed Selection', function() {
        var firstResultArray = [];
        var secondResultArray = [];
        var href;
        var h2;
        var p;

        beforeEach(function(done) {
            loadFeed(0, function() {
                $('.feed .entry-link').each(function(item) {
                    href = $(this).attr('href');
                    h2 = $(this).find('h2').text();
                    p = $(this).find('p').text();
                    firstResultArray.push({
                        href: href,
                        h2: h2,
                        p: p
                    });
                });
                done();
            });
        });
        beforeEach(function(done) {
            loadFeed(1, function() {
                $('.feed .entry-link').each(function(item) {
                    href = $(this).attr('href');
                    h2 = $(this).find('h2').text();
                    p = $(this).find('p').text();
                    secondResultArray.push({
                        href: href,
                        h2: h2,
                        p: p
                    });
                });
                done();
            });
        });
        it('changes content', function(done) {
            var length;
            var lengthFirst = firstResultArray.length;
            var lengthSecond = secondResultArray.length;
            if (lengthFirst === lengthSecond) {
                length = lengthFirst;
            } else {
                length = Math.min(lengthFirst, lengthSecond);
            }
            for (var i = 0; i < length; i++) {
                expect(firstResultArray[i].href).not.toBe(secondResultArray[i].href);
                expect(firstResultArray[i].h2).not.toBe(secondResultArray[i].h2);
                expect(firstResultArray[i].p).not.toBe(secondResultArray[i].p);
            }
            done();
        });

    });

    /* test that ensures when an entry is moved down one position that the position actually changes
     */
    describe('Moving entry down one position', function() {
        var array = [];
        var resultArray = [];
        it('changes position of entry', function() {
            $('.feed .entry-link').each(function(item) {
                array.push($(this).find('h2').text());
            });
            moveDownOnePosition($('.feed .entry-link')[0]);
            $('.feed .entry-link').each(function(item) {
                resultArray.push($(this).find('h2').text());
            });
            expect(resultArray[0]).not.toBe(array[0]);
            expect(resultArray[1]).toBe(array[0]);
        });
    });
}());