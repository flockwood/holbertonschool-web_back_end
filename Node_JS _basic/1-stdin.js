// Display welcome message
console.log('Welcome to Holberton School, what is your name?');

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
  console.log('This important software is now closing');
});
