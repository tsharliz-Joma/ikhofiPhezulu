# Project Overview

This project is a web application that includes various features such as user authentication, order management, and admin functionalities. The application is built using React, Material-UI, and Socket.IO for real-time updates.

## Table of Contents

1. [Components](#components)
   - [App](#app)
   - [OrderPage](#orderpage)
   - [AdminSignUp](#adminsignup)
   - [AdminLogin](#adminlogin)
   - [Dashboard](#dashboard)
   - [LoginPage](#loginpage)
   - [SignUpPage](#signuppage)
   - [DisplayUserPage](#displayuserpage)
   - [OrderStatusTracker](#orderstatustracker)
   - [PasswordProtection](#passwordprotection)
2. [Hooks](#hooks)
   - [useData](#usedata)
   - [useOrders](#useorders)
   - [useCoffeeOrders](#usecoffeeorders)
3. [Context](#context)
   - [ContextProvider](#contextprovider)
4. [Utilities](#utilities)
   - [config-overrides.js](#config-overridesjs)
   - [tsconfig.json](#tsconfigjson)

## Components

### App

**File:** `App.jsx`

The `App` component is the root component of the application. It initializes the application state and provides the context for the entire app.

### OrderPage

**File:** `OrderPage.jsx`

The `OrderPage` component handles the order management functionality. It allows users to place orders and tracks the status of each order.

### AdminSignUp

**File:** `AdminSignUp.jsx`

The `AdminSignUp` component handles the registration of new admin users. It includes form validation and submission logic.

### AdminLogin

**File:** `AdminLogin.jsx`

The `AdminLogin` component handles the login functionality for admin users. It includes form validation and submission logic.

### Dashboard

**File:** `Dashboard.jsx`

The `Dashboard` component displays the admin dashboard. It includes a list of orders and allows admins to manage them. The component is protected by a password using the `PasswordProtection` component.

### LoginPage

**File:** `LoginPage.jsx`

The `LoginPage` component handles the login functionality for regular users. It includes form validation and submission logic.

### SignUpPage

**File:** `SignUpPage.jsx`

The `SignUpPage` component handles the registration of new users. It includes form validation and submission logic.

### DisplayUserPage

**File:** `DisplayUserPage.jsx`

The `DisplayUserPage` component displays the details of the logged-in user.

### OrderStatusTracker

**File:** `OrderStatusTracker.jsx`

The `OrderStatusTracker` component tracks the status of a specific order. It uses the `orderId` prop to fetch and display the current status of the order.

### PasswordProtection

**File:** `PasswordProtection.jsx`

The `PasswordProtection` component protects certain routes with a password. It requires users to enter a 6-digit password to access protected routes like `adminRegister`, `adminLogin`, and `dashboard`.

## Hooks

### useData

**File:** `useData.js`

The `useData` hook provides access to the global state and dispatch function. It is used throughout the application to manage state.

### useOrders

**File:** `useOrders.js`

The `useOrders` hook fetches and manages the list of orders. It also handles real-time updates via Socket.IO.

### useCoffeeOrders

**File:** `useCoffeeOrders.js`

The `useCoffeeOrders` hook fetches and manages the list of coffee orders. It also handles real-time updates via Socket.IO.

## Context

### ContextProvider

**File:** `ContextProvider.js`

The `ContextProvider` component provides the global state and dispatch function to the entire application. It uses the `useReducer` hook to manage state.

## Utilities

### config-overrides.js

**File:** `config-overrides.js`

The `config-overrides.js` file customizes the Webpack configuration. It includes alias configuration for easier imports and fallback configurations for browser compatibility.

### tsconfig.json

**File:** `tsconfig.json`

The `tsconfig.json` file configures the TypeScript compiler options. It includes alias paths for easier imports and other compiler settings.

## Usage

To run the application, use the following commands:

```bash
# Install dependencies
npm install

# Start the development server
npm start


# To build the application for production, use the following command:
npm run build
```

### Explanation

1. **Components**: Each component is described with its file location and functionality.
2. **Hooks**: Each custom hook is described with its file location and functionality.
3. **Context**: The context provider is described with its file location and functionality.
4. **Utilities**: The utility files are described with their file locations and functionalities.
5. **Usage**: Instructions for running and building the application are provided.

This README file should help you understand the structure and functionality of your project.
