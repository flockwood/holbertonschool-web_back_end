#!/usr/bin/env node

/**
 * Interactive program that prompts for user name via stdin
 * Displays welcome message, captures input, and shows closing message on exit
 */

// Display welcome message
process.stdout.write('Welcome to Holberton School, what is your name?\n');

// Set encoding for stdin to get string data
process.stdin.setEncoding('utf8');

// Listen for readable data on stdin
process.stdin.on('readable', () => {
  const input = process.stdin.read();
  if (input !== null) {
    // Display the user's name
    process.stdout.write(`Your name is: ${input}`);
  }
});

// Listen for the end event (when stdin closes)
process.stdin.on('end', () => {
  process.stdout.write('This important software is now closing\n');
});
