Inspiration of the day
================

Problem Description
-------------------

You are to write a service that, every time it gets executed,
connects to a web service that returns a list of quotes
containing a word chosen by a manager,
then it randomly selects one quote from the list
and sends it by WhatsApp to a random employee
so that that employee gets inspired and motivated by the manager.

### Constraints

The entry point of the service only has this public method: `inspireSomeone(word: string): void;`

### Hints
- Use the `msw` library for testing HTTP requests to the quote's web service, (see [example](https://gist.github.com/franreyes/4cc595ce04897453ea2a876c8f5bf34d)).