GitHub Link: https://github.com/Apollo-Level2-Web-Dev/hello-prisma-orm



Welcome to today’s mission! 🎉

In this module, we’ll dive into Prisma ORM, one of the most powerful tools to interact with databases efficiently and safely in your projects. By the end of this mission, you’ll be able to handle database operations with confidence, using TypeScript-friendly practices.

## 48-1 Introduction to Prisma ORM
- prisma orm helps to connect the app with database
### what is ORm?
- ORM is Object Relational Mapper
### what is Prisma?
- Connects your app with database (SQL & NoSQL)
- Provides types-safe queries and schema modeling
- Works with postgresql, mysql, sqlite, mongodb, sql server, cockroachDB by writing same code

### Why should we learn prisma?
1. Productivity increases (as for complex query instead of query builder we can use this)
2. Type Safety 
3. Modern DX (modern developer experience as prisma provides migration, can generate types using command, provides prisma studio by using this we can see data like excel sheet- add delete, update, see)
4. Database Workflow Simplified (managing database is simple)
5. Community Ecosystem 
### Who should use prisma? 
- Fullstack and backend developers using node.js/ typescript 
- Teams needing scalable and maintainable database access 
- Devs who want less crying over sql 
### Where can be the prisma used? 
- fullstack apps (next.js, remix, etc)
- backend api's (express, nest.js, Fastify)
- Serverless environments (vercel, aws lambda, cloudflare workers)
- any project needing database + node.js 

#### Tips: 
- If Your app says "I need a database but sql gives me headache" -> that's prisma's time to shine 
- Think of prisma as google translator between javascript and your database - but with fewer maintenance; 

### Prisma in simple words 

1. `Write Schema` -> What i Want
2. `Run Migration` -> Make It Official (connection with the database)
3. `Generate Client` ->  Meet The in-laws (using the schema make a type with help of the prisma client)
4. `Query DB` -> Live Happily Ever After 


- Prisma, Sequelize, and TypeORM are popular Object-Relational Mappers (ORMs) for Node.js, each with distinct features and use cases.
#### Prisma: 
##### Pros 
- Modern Developer Experience: Offers a type-safe API, real-time type checking, and excellent TypeScript support.
- Simplified Migrations: Prisma Migrate automates schema migrations based on your data model.
- Performance: Optimized for query performance with a fast query engine.
- Focus: Emphasizes developer experience, type safety, and seamless integration with TypeScript.
- Very easy to read and write. Feels like writing plain JavaScript/TypeScript.
- Comes with auto-generated types → fewer mistakes.
- Has a nice Prisma Studio app to see/edit data like a spreadsheet.
- Modern, fast-growing, great docs.
##### Cons 
- Limitations: Limited database support compared to TypeORM and Sequelize.
- Less flexible if you want to write custom SQL everywhere.
- Works best with TypeScript/JavaScript only.
- Migrations (changing the database structure) are opinionated — not everyone likes it.

#### Sequelize:
##### Pros 
- Maturity and Community: A well-established ORM with a large community and extensive documentation.
- Ease of Use: Known for its relatively simple API and ease of getting started.
- Database Support: Supports a wide range of relational databases.
- Features: Provides features like promises, model hooks, transactions, migrations, and validations.
- Very old and battle-tested (lots of projects use it).
- Supports many databases.
- You can write raw SQL when you want.
##### Cons 
- Limitations: TypeScript support is not as robust as Prisma or TypeORM, and managing complex queries can become challenging.
- Code can get messy and confusing (“callback hell” if not careful).
- TypeScript support is weak (harder to get autocomplete).
- Not as modern → feels a bit old-school compared to Prisma.

#### TypeORM: 
##### Pros 
- Flexibility: Supports both Active Record and Data Mapper patterns, offering architectural flexibility.
- Database Compatibility: Wide database support, including various relational and some NoSQL databases.
- TypeScript Focus: Designed with TypeScript in mind, offering strong type safety.
- Features: Robust transaction support and a powerful migration system.
- Decorators (like @Entity) make it feel very close to how you design models in OOP (object-oriented programming).
- Works well with TypeScript.
- Lets you choose between Active Record style (methods inside models) or Data Mapper style (separate repositories).

##### Cons
- Limitations: Can have a steeper learning curve, especially for advanced features, and migration management can be complex in large applications.
- Migrations can be tricky/unreliable sometimes.
- Performance is not the best in huge apps.
- The community is smaller than Prisma.


#### Choosing an ORM:
- For modern, type-safe applications with a focus on developer experience and TypeScript: Prisma is a strong contender.
- For projects requiring broad database compatibility and a mature, well-supported ORM: Sequelize is a reliable choice.
- For TypeScript-heavy projects demanding architectural flexibility and strong type safety: TypeORM provides a powerful solution.

## 48-2 Project Initialization with Prisma

- prisma official docs 

[Prisms.io](https://www.prisma.io/docs/getting-started)

- Install Prisma 
[Prisma With Postgres](https://www.prisma.io/docs/getting-started/setup-prisma/start-from-scratch/relational-databases-typescript-postgresql)

```
mkdir hello-prisma
cd hello-prisma
```

```
npm init -y
npm install prisma typescript tsx @types/node --save-dev
```

```
npx tsc --init
```

```
npx prisma
```

```
npx prisma init --datasource-provider postgresql --output ../generated/prisma
```
- set the env 

```
DATABASE_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=SCHEMA"
```
### Migration Works 
- Set the schema prisma -> schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

// will be given by default 
generator client {
  provider = "prisma-client-js"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// additional schema 
model Post {
  id        Int      @id @default(autoincrement())
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
  title     String   @db.VarChar(255)
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  Int
}

model Profile {
  id     Int     @id @default(autoincrement())
  bio    String?
  user   User    @relation(fields: [userId], references: [id])
  userId Int     @unique
}

model User {
  id      Int      @id @default(autoincrement())
  email   String   @unique
  name    String?
  posts   Post[]
  profile Profile?
}
```

- run this command to migrate 

```
npx prisma migrate dev --name init
```
- this will create a `migration` folder inside the prisma folder and inside the `migration.sql`, `sql` query will be generated 
- It will also give a folder named `generated` which will create `types` for our project  

### Create prisma client if not created 

```
npm install @prisma/client
```
- if there is need to generate manually run this command 

```
npx prisma generate
```
- by default prisma client will be created and will be generated while we will be creating the migration. 

## 48-3 Writing Your First Prisma Schema
- creating user model in `prisma` -> `schema.prisma`

```prisma 
model User {
  id           Int     @id @default(autoincrement())
  name         String
  email        String // required field 
  profilePhoto String? // making it optional
}

```
- migrate the schema 

```
npx prisma migrate dev 
```
- If we want to reset the stored data of previous and set the new one 

```
npx prisma migrate reset
```
- then migrate 

```
npx prisma migrate dev 
```

## 48-4 Solving TypeScript Issues with Prisma
- lets write query using the created schema migration 

- create a function in root -> index.ts 

```ts 
async function main(){
console.log("Hello From Prisma")
}

main()
```

- install the `ts-node`

```
npm i -D ts-node
```
- rin the index file 
```
ts-node index.ts
```

- Lets connect with prisma 

- add `"type" : "module` inside the package.json

```json
{
  "name": "prisma-orm-essentials",
  "version": "1.0.0",
  "description": "GitHub Link: https://github.com/Apollo-Level2-Web-Dev/hello-prisma-orm",
  "main": "index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/Sazid60/PRISMA-ORM-ESSENTIALS.git"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "bugs": {
    "url": "https://github.com/Sazid60/PRISMA-ORM-ESSENTIALS/issues"
  },
  "homepage": "https://github.com/Sazid60/PRISMA-ORM-ESSENTIALS#readme",
  
  "devDependencies": {
    "@types/node": "^24.3.1",
    "prisma": "^6.16.0",
    "ts-node": "^10.9.2",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  },
  "dependencies": {
    "@prisma/client": "^6.16.0"
  }
}

```

- `"moduleResolution": "nodenext",` inside tsconfig.ts 

```ts 
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    "rootDir": ".",
    "outDir": "./dist",

    // Environment Settings
    // See also https://aka.ms/tsconfig/module
    "module": "nodenext",
    "target": "esnext",
    "moduleResolution": "nodenext",
    "types": [],
    // For nodejs:
    // "lib": ["esnext"],
    // "types": ["node"],
    // and npm install -D @types/node

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Style Options
    // "noImplicitReturns": true,
    // "noImplicitOverride": true,
    // "noUnusedLocals": true,
    // "noUnusedParameters": true,
    // "noFallthroughCasesInSwitch": true,
    // "noPropertyAccessFromIndexSignature": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}

```

- root -> index.ts 

```ts 
import { PrismaClient } from "./generated/prisma/index.js"





const prisma = new PrismaClient()

async function main(){
console.log("Hello From Prisma")
}

main()

```

## 48-5 Inserting Data into the Database
- we will delete the generate folder and generate again but we do not want to mention the output here in schema.prisma

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

// Looking for ways to speed up your queries, or scale easily with your serverless or edge functions?
// Try Prisma Accelerate: https://pris.ly/cli/accelerate-init

generator client {
  provider = "prisma-client-js"
  // output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model User {
  id           Int     @id @default(autoincrement())
  name         String
  email        String // required field 
  profilePhoto String? // making it optional
}

```
- run the command to generate new 

```
npx generate prisma 
```
- add the script to package.js 

```json 
  "scripts": {
    // "dev": "node --loader ts-node/esm src/index.ts",
    "dev": "tsx src/index.ts",
    "build": "tsc",
    "start": "node dist/index.js"
  },
```

- src -> index.ts

```ts 

```

- now run `npm run dev` this will create the user. 
## 48-6 Finding Data from the Database

- see all the data 

```ts 
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Hello From Prisma")
    const usersData = await prisma.user.findMany()
    console.log(usersData)
}

main()

```

- if we want to find using conditions 

```ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Hello From Prisma")
    const usersData = await prisma.user.findMany({
        where :{
            id : 3
        }
    })
    console.log(usersData)
}

main()

```

- if we want to find using name 

```ts 
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    const usersData = await prisma.user.findMany({
        where :{
            name : "Sazid"
        }
    })
    console.log(usersData)
}

main()

```
- if we want to find get only one in object. 

```ts
import { PrismaClient } from "@prisma/client"


const prisma = new PrismaClient()

async function main() {
    console.log("Hello From Prisma")

    const findUserById = await prisma.user.findUnique(
        {
            where: {
                id: 3
            }
        }
    )

    console.log(findUserById)
}

main()

```
- if we want to throw error if any user not found we have to use `findUniqueOrThrow`

```ts
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

async function main() {
    console.log("Hello From Prisma")
    const findUserById = await prisma.user.findUniqueOrThrow(
        {
            where: {
                id: 7
            }
        }
    )

    console.log(findUserById)
}

main()

```

### Summary 

1. Create 
2. findMany - array of object 
3. findUnique - returns single object 
4. findUnique - return single object if exists, otherwise throw error
