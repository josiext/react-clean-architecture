# React Clean Achitecture

This is an example of a React App using Domain Driven Design (DDD) with Clean Achitecture.

## About Clean Architecture

```
- src
    - index.tsx
    - configs.ts
    - entities
        - todo
            - index.ts
    - application
        - todo
            - index.ts
    - Frameworks
        - presentation
            - App.tsx
            - pages
                - todo
                    - index.tsx
                    - Todo.components.tsx
                    - Todo.logic.ts
                    - Todo.types.ts
                    - Todo.module.css
            - ui
                - textInput
                    - index.tsx
                    - textInput.types.ts
            - libs
                - date
                    - index.ts
                    - Date.types.ts
                    - Dates.test.ts
                - string
                    - index.ts
                    - String.types.ts
                    - String.test.ts
        - repositories
            - Todo
                index.ts
        - store
            - index
```

## Start

To start the app, run:

1. `npm install`

2. `npm start`
