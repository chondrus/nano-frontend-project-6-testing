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

    /* This suite is all about the RSS feeds definitions.
     * (The allFeeds variable in our application.)
     */
    describe('RSS Feeds', function() {

        /* ensures that allFeeds variable is defined and not empty. */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* ensures that each element in allFeeds
         * has a URL defined and that the URL is not empty.
         */
        it('have defined, non-empty urls', function() {
            var allLinks = allFeeds.map(function(feed) {
                // undefined and "" will both cause a simple return here,
                // making both undefined for the expect below
                if (feed.url) {
                    return feed.url;
                } else {
                    return;
                }
            });
            expect(allLinks.indexOf(undefined)).toBe(-1);
        });

        /* ensures that each element in allFeeds
         * has a name defined and that the name is not empty.
         */
        it('have defined, non-empty names', function() {
            var allNames = allFeeds.map(function(feed) {
                // undefined and "" will both cause a simple return here,
                // making both undefined for the expect below
                if (feed.name) {
                    return feed.name;
                } else {
                    return;
                }
            });
            expect(allNames.indexOf(undefined)).toBe(-1);
        });

    });


    /* This suite is all about the hamburger menu */
    describe('The menu', function() {

        /* ensures menu element is hidden by default. */
        it('is hidden by default', function() {
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

        /* ensures menu changes visibility when menu icon is clicked. */
        it('toggles visibility when clicked', function() {
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(false);

            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });
    });


    /* This suite is for the initial entries */
    describe('Initial Entries', function() {

        beforeEach(function(done) {
            var test = getRandomInt(0, allFeeds.length);
            loadFeed(test, done);
        });

        /* ensures when loadFeed is called and completes, there is
         * at least one .entry element within the .feed container.
         */
        it('there should be at least one', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });

    /* This suite is for selecting a new feed */
    describe('New Feed Selection', function() {

        var initialContent;
    
        beforeEach(function(done) {
            loadFeed(0, function() {
                initialContent = $(".feed").html();
                done();
            });
        });

        /* ensures content changes when new feed is loaded via loadFeed. */
        it('changes content', function(done) {
            loadFeed(1, function() {
                expect(initialContent).not.toEqual($(".feed").html());
                done();
            });            
        });

        /* test 2: it changes again, back to what it was initially */
        it('changes content to original', function(done) {
            loadFeed(0, function() {
                expect(initialContent).toEqual($(".feed").html());
                done();
            });            
        });
    });
}());


// credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
