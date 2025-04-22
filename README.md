#Blog Application
Build a blog website using Next.js 15, tailwindcss

## Environment
* NodeJS: v22.10.0

## Introduce the folder structure

### 1. `app` folder
* The app folder provides a clear and structured foundation for the core application code, fostering better development
  practices, promoting code re-usability, and facilitating a more maintainable and scalable Next.js project.
    * `api` folder
        * Making APIs request inside the project.
    * Shared layout
    * Nested routing
    * Loading states
    * Error handling
    * More...

### 2. `assets` folder
* The `assets` folder holds static assets, such as images, fonts, and other files, that need to be publicly accessible from
  the browser.

### 3. `components` folder
* Here we can place the components that make up our pages. These components are highly tied to the domain
  and are not supposed to be highly reusable across projects. They're business-logic rich,
  and we can build them using the reusable UI components from `Atom`, `Molecules` and `Organisms`.

* This folder will be organizational by atomic design:
    * `Atom`s are the smallest building blocks of your UI, representing basic HTML elements.
      These atoms include basic HTML elements like form labels, inputs, buttons, and others that can’t be broken down
      any further without ceasing to be functional.

    * `Molecules` are combinations of atoms that form more complex UI components. For example, a form label,
      search input, and button can join together to create a search form molecule.

    * `Organisms` are relatively complex UI components composed of groups of molecules and/or atoms and/or other
      organisms. These organisms form distinct sections of an interface.

    * `Templates` define the overall layout or structure of your pages using organisms. 
      Create templates by arranging organisms to form page layouts.

* Note: Atoms and Molecules shouldn't have any business logic. Maybe the molecules can have some event handlers for
  there buttons, but they shouldn't. Organisms can have logic, if needed. But if you really want to implement that
  pattern, then the container should handle all the logic (pages/templates) so called HOCs, higher order components.

### 4. `configs` folder
* The config folder to actual configuration of the project in itself and not database related stuff
    * App settings
    * i18n
    * caching
    * AWS
    * More...

### 5. `context` folder
* This directory contains files related to managing global state using the React Context API. Contexts are used to
  share state across multiple components without having to pass props manually through each level of the
  component tree.

* Using Context in `Client Components`
    * You can use all the context APIs, such as `createContext`, `useContext`, and `Provider`, in your Client Components

* Rendering Third-Party Context Providers in `Server Components`
    * React Server Components don't support creating or consuming context `directly`. If you try to create a context in
      a Server Component, it will result in an error. Similarly, rendering a third-party context provider that doesn't
      have the "use client" directive will also cause an error in Server Components.
    * Instead, you can create your own Client Component that wraps the third-party provider

### 6. `hooks` folder
* Hooks provide access to states for functional components while creating a React application. It allows you to use
  state and other React features without writing a class. Placing them in a dedicated directory allows for easy access
  and reuse across components throughout your application.

### 7. `libs` folder
* The `lib` directory is for more complex functionality that often:
    * API client configurations
    * Authentication helpers
    * Database connections

### 8. `modules` folder
* This folder contains server code. Within the `modules` folder, module is organized by the structure Modular Monolith.
    * `[name_module].controller.ts`
        * The controller controls the requests of the user and then generates an appropriate response to the front-end.
          The Controller delegates complex `business logic` tasks to the `service`, and the service layer interacts
          with the `Repository` to perform data-related operations.

    * `[name_module].entities.ts`
        * Entities are the set of related business rules that are critical for an application to function. They are the
          least likely to change when something external changes.

    * `[name_module].model.ts`
        * Defines the data models used throughout the application.

    * `[name_module].repository.ts`
        * Files directly interact with databases, such as queries and mutations, centralized, enabling clear separation of
          concerns and streamlining data interactions.

    * `[name_module].service.ts`
        * Handling all business logic that the `controller` brings it. Returns database to controllers.

* Reference link:
    * https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html
    * https://petarivanov.me/blog/how-to-better-structure-your-next-nodejs-project-the-modular-approach
    * https://startup-house.com/glossary/repository-vs-service-pattern

### 9. `styles` folder
* The `styles` folder contains global styles and custom CSS files, allowing consistent styling across components and pages.

### 10. `utils` folder
* `constants`: constants to maintaining and organizing constant values used across the application. 
      It contributes to code readability, maintainability, and prevents the repetition of magic strings or numbers.
* `enum`: Enum members are typically used to store constants. Members can have string constants, numerical constants
      or mix of both. Homogeneity of member values determines whether the enum is a string enum or a numerical enum.
* `types`: Ensure you incorporate Typescript definitions within project `types` folder.
      This practice will boost type safety, deliver comprehensive code documentation, and foster better development practices.
* `utils`: Storing utility functions in a separate `utils` folder can help improve code organization and maintainability.
      By grouping common functionalities together, you can enhance code reusability and make it easier to and reference specific
      functions when needed.

### 11. `middleware` file
* This folder contains of a configuration file where we store environment variables in config.js. We will use this file
  to set up multiple environment configurations in your application. Ex- Environment Configuration, WebPack Configuration,
  Babel Configuration, etc.


## Getting Started

First, run the development server:

```bash
1. npm install

2. npm run dev

```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
