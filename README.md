# News feed - social posts
This is an app I've built which allows users to publish, like and comment posts of others. It is build with bi-directional communication with websockets (socket.io).
The backend won't run if the project is cloned on another machine, because of Firebase and its requirement for a service account for the admin sdk for node JS and it will require more time to set up, so please check the demo below.

# Technologies
Main technologies used to create this app are:
 - React/Redux(RTK)
 - Material UI
 - Node/Express js
 - MongoDB

# Demo
[App link](news-feed-dc9fa.web.app/)  
The frontend is hosted on Firebase, the backend is on Heroku and the database is on Mongodb Atlas.

# Feed page
![feed](https://www.dropbox.com/s/y42qwecdkmzb09e/news-feed-page.png?raw=1)

# App workflow
Login flow:  
![login](https://www.dropbox.com/s/rkf0x634mv7fg0n/Login%20Diagram.jpg?raw=1)  
Basic app flow with redux and express:  
![app flow](https://www.dropbox.com/s/chtotoioapgtn7n/App%20flow.jpg?raw=1)

# TODO List
- [x] Login page
- [x] Register page
- [x] Home page
- [x] Authentication
- [x] add firebase admin sdk BE
- [x] get posts functionality BE/FE
- [x] adjust statuses to be succeeded when fulfilled
- [x] fetch data only when status is 'idle' (empty)
- [x] add is guest route guard
- [x] create posts BE/FE
- [x] delete posts if owner BE/FE
- [x] like posts BE/FE
- [x] add comment section with material ui to posts
- [x] comment posts BE/FE
- [x] delete comment if post owner or comment author
- [x] add FE sorting
- [x] my posts and all posts option to view in feed section
- [ ] try optimizing by normalizing data with createEntityAdapter e.g. as key,value pairs
