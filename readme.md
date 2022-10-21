Hello!

This is a test task for your application.

## Project description

The example project is a one page with a shopping cart. The page consists of following parts:

- List of products in the cart. Each product has a name and a price. For each product user can decide to include or exclude it. User also can increase and decrease the amounts of each product they want to buy. At the bottom of the product list the total price is displayed;

- Promocode input. Allows user to enter a promocode to get a discount on the entire order;

- Email input. Requires user to specify an email to which the product links will be sent;

- Agreement checkbox. Required to be checked by user;

- Payment button.

## Requirements

To pass this test you will need to achieve 2 things:

- Fix two bugs in the app (see below);

- Stylize the page following a prepared design in figma; link to the design: https://www.figma.com/file/bS9PE7aijT2Ow8nqe5OogT/cart?node-id=0%3A1;

  - You need to have a Figma account to inspect the design;

  - Stylizing of checkboxes is not required;

  - Stylizing for desktop is not required.

### Bug descriptions

- The cart allows to proceed to payment without filling in email and checking the agreement checkbox;

- The total price doesn't display the correct amount and doesn't change when selecting products or changing amounts of products.

## Project structure

These are notable parts of the project:

- /public - directory for public files like images and icons
- /src - source code of the project
  - App.tsx - main file, start working from here
  - styles.css - main stylesheet file, write your styles here

## How to start

### On codesandbox.io

Fork this project to your codesandbox account and start editing. "Fork" button is on the top right corner of the page.

### On your computer

1. Download this project as .zip archive (Top left menu -> File -> Export to ZIP);
2. Extract archive to your local directory;
3. Run `npm install` in your terminal to install dependencies\*;
4. Run `npm run start` to start up the project\*.

\* You will need node.js installed on your computer to do this. Tested on node v16.17.0 and v14.20.0.

## Helpful materials

- React API documentation: https://reactjs.org/docs/react-api.html

- CSS flexbox cheatsheet: https://css-tricks.com/snippets/css/a-guide-to-flexbox/
