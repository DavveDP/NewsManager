# NewsManager
Student A (Core Article Functionality: CRUD)
- Responsible for components: ArticleListComponent, ArticleDetailsComponent, ArticleEditionComponent
- Complete the basic logic for displaying articles in lists, displaying details, creating, editing, and deleting articles
- Can use fake data (mock JSON) to debug the UI first, independent of Student B's login functionality.

Student B (Authentication + User Status Management + Permission Control)
- Responsible for components: LoginComponent (integrated into the homepage) and NavbarComponent
- Functionality: Login/Logout, API Key management, and control button display based on login status
- Permission Control: Do not display the "Create/Edit/Delete" buttons for logged-in users
- He can also start by using mock login logic (fake username and password) to develop independently, independent of Student A's article functionality. 

Student C (UI & Engineering Fundamentals & User Experience Optimization)
- Responsibilities:
- Project infrastructure (initializing the Angular project, generating components, configuring routing)
- Global UI styling (Bootstrap + responsive Navbar + global CSS)
- Error notifications and feedback (deletion confirmation pop-ups, save/login result notifications)
- He can initially develop static HTML + Bootstrap templates and later integrate them with the features of A and B.


This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 20.3.1.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
