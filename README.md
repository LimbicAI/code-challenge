## How to setup

This project uses postgres db for storage and [hasura](https://hasura.io/) as graphql engine.
There is a `docker-compose` file in `db` folder which will prepare backend. Please run the following in you r terminal

    cd db
    docker-compose up -d
2 new containers will be created for postgres and hasura. To verify every thing is working please visit http://localhost:8080/console

To create schema and seed tables run this command (make sure you are still in db folder)

    hasura migrate apply
   and then

    hasura metadata apply

Now you have to be able to see `questions` and `answers` tables in hasura http://localhost:8080/console/data/default/schema/public

to run the project please navigate to root folder and

    npm run dev

## Stack and tools
Some highlights about implementation

 1. This is a Next.js project. Pages are rendered client side.
 2. Tailwind css for styling. There are many great tools out there for styling a react project but I found tailwind quick and handy for this project. I'm experienced working with [styled components](https://styled-components.com/) as well
 3. TypeScript for type safety
 4. ESLint to maintain code style
 5. [Apollo client](https://www.apollographql.com/docs/react) for graphql client
 6. [react hook form](https://react-hook-form.com/) to simplify working with forms
 7. No usage of 3d party UI libraries to show case some simple ui component implementation

Here is a quick screen capture of project
https://drive.google.com/file/d/18cXAP4NBL7Q1BRlU8rZY2mNl9HUMLYIk/view?usp=sharing