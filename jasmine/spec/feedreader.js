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
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
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


        /* Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
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
    describe('Initial entries', function() {

        /* ensures when `loadFeed` is called and completes, there is 
         * at least one .entry element within the .feed container.
         */
        beforeEach(function(done) {
            var test = getRandomInt(0, allFeeds.length);
            loadFeed(test, done);
        });

        it('there should be at least one', function(done) {
            expect($(".feed .entry").length).toBeGreaterThan(0);
            done();
        });
    });

    /* TODO: Write a new test suite named "New Feed Selection"

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
}());


// credit: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
