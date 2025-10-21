/**
 * Utility functions
 */

// TODO: Add JSDoc comments for all functions
function formatDate(date) {
    // FIXME: This doesn't handle timezone correctly
    return date.toLocaleDateString();
}

// TODO: Implement caching mechanism
function fetchData(url) {
    // FIXME: No error handling for network failures
    return fetch(url).then(res => res.json());
}

// TODO: Add unit tests for validation functions
function validateEmail(email) {
    // FIXME: Regex is too simple, doesn't catch all invalid emails
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
}

module.exports = {
    formatDate,
    fetchData,
    validateEmail
};
