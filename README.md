# real-time-data

# Client

This folder contains the client-side code for the project.

## Overview

The client-side of the project is responsible for the user interface and interactions with the users. It typically includes the front-end code written in languages such as HTML, CSS, and JavaScript.

## Structure

The client folder is organized as follows:

- `src`: Contains the source code for the client-side application.
- `public`: Contains static assets like images, fonts, and HTML files.
- `components`: Contains reusable UI components.
- `pages`: Contains different pages or views of the application.
- `styles`: Contains CSS or styling files.
- `utils`: Contains utility functions or helper files.

## Getting Started

To run the client-side application locally, follow these steps:

1. Install dependencies:

2. Start the development server:


3. Open your browser and visit http://localhost:3000 to see the client-side application in action.

## Available Scripts

In the client folder, you can run the following scripts:

- `npm start`: Starts the development server.
- `npm run build`: Builds the client-side application for production.
- `npm test`: Runs tests for the client-side code.

## Dependencies

- React: A JavaScript library for building user interfaces.
- Other dependencies specified in the `package.json` file.





# Server

This directory contains the server-side code for the Real-Time Data application.

## Setup Instructions

1. Make sure you have Node.js and npm installed on your machine.
2. Install dependencies by running `npm install`.
3. Set up environment variables by creating a `.env` file and adding necessary variables.
4. Start the server by running `npm run dev`.

## Server Structure

- `server.ts`: Main server file handling connections and routes.
- `models/`: Contains database models for MongoDB.
- `routes/`: Contains routes for different endpoints.
- `controllers/`: Contains logic for handling requests.
- `utilities/`: Contains utility functions used across the server.

## Endpoints

- `/stocks/fetchAll`: Retrieves all stocks from the database.
- `/stocks/fetchByCode/:code`: Retrieves a specific stock by its code.

