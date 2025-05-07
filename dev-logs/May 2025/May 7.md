
# 🧠 Daily Developer Journal – Job Tracker Project

Use this template every day to track your learning, progress, and blockers.

---

## 📅 Date:

`2025-05-07`

## ✅ What I Did Today

- [X] Came up with 10 project plans to work on
- [X] Set up github repo
- [X] Initialized the front end (!!!)
- [X] Initialized backend
- [X] Set-up MongoDB Atlas
- [X] Created my models for User and Application
- [X] Created register route
- [X] Created login route

## 💡 What I Learned

- Learned how to start a react app using Vite:

    - why? I'm starting this app with what I think is easiest, the frontend. React is a framework for JS that is used for frontend so I'll use that. Vite is a tool that does it all...seems like a black box to me for the time being it shall do.

    - Start in root, do `npm create vite@latest client -- --template react`
        - `npm` → Node's package manager (used to install dev tools)

        - `create vite@latest` → Runs Vite’s setup script (latest version)

        - `client` → The name of the folder where the app will be created

        - `--template react` → Tells Vite to create a React project (not Vue or vanilla JS)
    - Go into the client folder and do `npm install` 

        - This reads the file package.json and installs all the libraries needed for your React app to work. Will create a folder named node_modules

    - Lastly, run `npm run dev` to start the React app.

- Learned how to start the backend using Express and node.js
    - run `npm init -y` to create package.json file that tracks dependecies
    - install backend libraries using `npm install express mongoose cors dotenv bcrypt jsonwebtoken`
        Library	| Why It's Needed
        | -------| -------|
        | express| Your web server — lets you create routes like /login
        |mongoose|Lets you talk to your MongoDB database
        cors|Lets your frontend (on a different port) talk to your backend
        dotenv| Lets you store secrets like DB passwords in a safe .env
        bcrypt| Used to hash passwords securely (never store plain text!)
        jsonwebtoken|For JWT login tokens — lets users stay logged in
    - Then create `index.js` (i commented on each line explaining what is going on)
    - Create `.env` file which stores my secrets like api keys and ports and stuff for security, make sure it's in the .gitignore
    - run `node index.js` to run the backend
- Created my first MongoDB Atlas account and DB, was pretty easy and got to learn about connection strings and all.
- Learned what mongoose is, just a lib that connects mongoDB to my codebase.
- Learned how to make models in mongoose
- Tested my first api route for registration, it's so rewarding to get a response back. Feels like it's alive. Does anyone else get that? *cricket noises...probably*
- Auth system fully working now!

## 🚧 What Confused Me or Broke

There's so much I don't know...I don't even know what I don't know but thank goodness I have access to chat. Also, there is SO much to do in backend like damn.

## 🔁 What I Plan To Do Tomorrow
- [ ] Set up Mongoose models (User, Application)
- [ ] Implement user registration route (backend)

---

Repeat daily. Reviewing this will 10x your growth over time.
