/**
 * Example application demonstrating TODO/FIXME cleanup workflow
 */

// TODO: Add input validation for user data
function processUser(user) {
    console.log(`Processing user: ${user.name}`);
    // FIXME: This doesn't handle null/undefined users
    return user.name.toUpperCase();
}

// TODO: Implement proper error handling with try-catch
function calculateTotal(items) {
    let total = 0;
    for (const item of items) {
        // FIXME: Need to validate item.price is a number
        total += item.price;
    }
    return total;
}

// TODO: Add logging functionality
function main() {
    const testUser = { name: "Alice" };
    const result = processUser(testUser);
    console.log(`Result: ${result}`);

    // TODO: Add more test cases
    const items = [
        { name: "Book", price: 10 },
        { name: "Pen", price: 2 }
    ];

    const total = calculateTotal(items);
    console.log(`Total: $${total}`);
}

// FIXME: Should export functions for testing
main();
