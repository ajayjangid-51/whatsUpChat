# whats'UpChat
## Messenging App

- I developed a photo sharing and chat messaging web application similar to Instagram and WhatsApp using the MERN stack (MongoDB, Express.js, React, and Node.js). The application allows users to upload and share photos, as well as search, follow and message other users in real-time.

- The application features a user-friendly interface that allows users to browse, like, and comment on photos, as well as message other users. I used Firebase Authentication for signin with Google accounts. 

- I used MongoDB to store the user and photo data, and used Mongoose for data modeling and validation. I also implemented a feature for image compression and optimization to ensure that photos can be displayed quickly and efficiently.

- I used Redux for managing the application's state. Additionally, I implemented a search feature and filtering options to help users quickly find the photos and users they are looking for.

- I implemented authentication using JSON Web Tokens (JWT) and cookies, JWT is a JSON object that is used to securely transmit information between parties. I used JWT to encode the user's information, such as the user's ID and email, and then sent it as an HTTP-only and secure cookie to the client.

- On the client-side, I stored the JWT in the browser's cookie storage, which is a secure way to store information on the client side. Every time the client makes a request to the server, the JWT is sent in the headers of the request, allowing the server to authenticate the user.

- Additionally, I used bcrypt to hash the user's password before storing it in the database, which provides an added layer of security by making it difficult for anyone to access the user's password.

- I also implemented a middleware function that verifies the JWT on every protected route, ensuring that only authenticated users have access to certain parts of the application.

- Overall, using JWT and cookies for authentication allowed me to create a secure and efficient way for users to log in and access protected routes in the application

- Additionally, I am deciding to implemented Push Notifications to alert users of incoming messages even when they are not actively using the app.

- The application was designed to have similar user interface and functionality as Instagram and WhatsApp, making it easy for users to navigate and use. The goal of this project was to create a powerful, safe&secure and easy-to-use platform for photo sharing and messaging that can be used for personal and professional use.

- #### During the development of the Project, I encountered several notable accomplishments and challenges:

## Accomplishments:
  - 1.Successfully implemented real-time messaging functionality using expressJs, Mongodb and WebSockets(socket.io).
  - 2.Implemented Push Notifications to alert users of incoming messages even when they are not actively using the app.
  - 3.Developed an intuitive user interface that closely mimics the design and functionality of the popular messaging app WhatsApp.
  - 4.Successfully implemented authentication and authorization using JSON Web Tokens (JWT), bcryptJs and cookies. with and integrated Firebase Authentication for         signing with Google Accounts.
  
## Challenges:

  - 1.Ensuring the real-time messaging functionality was working seamlessly and with low latency.
  - 2.Implementing the push notifications in a way that was efficient and didn't drain the user's battery.
  - 3.Ensuring the application was scalable to handle large numbers of users and messages.
  - 4.Making sure that the application was secure and protected against common web vulnerabilities.
  
##### Overall, the development of this project was a challenging but rewarding experience, and it allowed me to improve my skills in web development, especially in real-time communication, low level design of architecture of messaging systems, modern frontend implementation using materialUI,chakraUi and many more.
