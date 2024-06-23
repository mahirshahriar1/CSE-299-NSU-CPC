# NSU CPC Website Redesign

## Video Demo
<a href="https://www.youtube.com/watch?v=-EOPMRgjLik" target="_blank">
  <img src="https://img.youtube.com/vi/-EOPMRgjLik/0.jpg" alt="NSU CPC Website Redesign Overview" style="width: 300px; height: auto;" />
</a>

## Contents
- [Contributors](#contributors)
- [Overview](#overview)
- [Project Goals](#project-goals)
- [Technology Stack](#technology-stack)
- [Firebase Integration](#firebase-integration)
- [Key Features](#key-features)
- [Deployment](#deployment)
- [Future Enhancements](#future-enhancements)
- [Installation Process](#installation-process)
  - [Prerequisites](#prerequisites)
  - [Front-End Installation](#front-end-installation)
  - [Back-End Installation](#back-end-installation)
  - [Running the Application](#running-the-application)
- [Conclusion](#conclusion)

## Contributors
- [**Mahir Shahriar Tamim**](https://github.com/mahirshahriar1) (2131377042): Back-end development, database management, security implementation.
- [**Sahil Yasar**](https://github.com/BunnyWarlock/) (2122060642): Front-end Development, testing, deployment, documentation.
- [**Shahriar Ratul**](https://github.com/dazed-n-razed) (2111514642): Front-end development, UI/UX design.


## Overview
The Career Placement Center (CPC) at North South University (NSU) has been pivotal in guiding students towards successful careers since 1996. Recognizing the need for modernization, our project focused on redesigning the CPC website using the latest web technologies to create a more user-friendly, engaging, and efficient platform.

## Project Goals
- **Modern Design**: Implement a contemporary design that is visually appealing and intuitive.
- **Responsive Layout**: Ensure seamless functionality across all devices, from desktops to smartphones.
- **Enhanced Functionality**: Introduce features like secure authentication, dynamic job listings, and user-friendly dashboards.
- **Improved Maintainability**: Utilize a robust technology stack for easier updates and maintenance.

## Technology Stack
- **Front-End**: 
  - **React.js**: For building dynamic user interfaces.
  - **Tailwind CSS & Daisy UI**: For responsive and modern styling.
- **Back-End**:
  - **Node.js & Express.js**: For scalable and efficient server-side processing.
  - **MongoDB**: For flexible and scalable database solutions.
- **Authentication**: 
  - **Google Sign-In & JWT**: For secure user authentication.

## Firebase Integration
Firebase is a platform developed by Google for creating mobile and web applications. In this project, Firebase was used for storing user CVs and profile images. Here’s how Firebase is integrated into the project:

### Storage of CVs and Images
Firebase Cloud Storage provides a scalable and secure way to store and serve user-generated content such as CVs and profile pictures.

### Integration
Firebase is easily integrated with the application, allowing users to upload their CVs and images directly through the website.

### Security
Firebase ensures that uploaded files are securely stored and easily accessible, with proper access controls in place.

## Key Features
- **Enhanced Login Functionality**: Single-page login for all user types and Google Sign-In.
- **Custom CV Generation**: Integrated feature for creating custom CVs.
- **Admin Controls**: Admin capabilities to disable users and approve posts.
- **Responsive Design**: Ensures usability across various devices.
- **Secure Data Handling**: Implementing JWT and data encryption for secure transactions.

## Deployment
- **Platform**: Deployed on Railway for seamless integration and management.
- **Environment Management**: Use of `.env` files for secure environment-specific configurations.
- **Version Control**: Managed through GitHub, with separate repositories for front-end and back-end.

## Future Enhancements
- **Additional Features**: Continuous improvement by adding more interactive and user-friendly features.
- **Performance Optimization**: Ongoing efforts to enhance website performance and scalability.

## Installation Process

### Prerequisites
- Node.js (version 14.x or later)
- MongoDB (local or MongoDB Atlas)
- Git

### Front-End Installation

1. **Clone the Front-End Repository**
    ```bash
    git clone https://github.com/yourusername/nsu-cpc-frontend.git
    cd nsu-cpc-frontend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```
3. **Setup Environment Variables**
    - Create a `.env` file in the root directory of the back-end project.
    - Add the following environment variables:
      ```plaintext
        GENERATE_SOURCEMAP=false
        REACT_APP_FIREBASE_API_KEY=
        REACT_APP_FIREBASE_AUTH_DOMAIN=
        REACT_APP_FIREBASE_PROJECT_ID=
        REACT_APP_FIREBASE_STORAGE_BUCKET=
        REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
        REACT_APP_FIREBASE_APP_ID=
        REACT_APP_API_URL=  
      ```
4. **Start the Development Server**
    ```bash
    npm start
    ```

### Back-End Installation

1. **Clone the Back-End Repository**
    ```bash
    git clone https://github.com/yourusername/nsu-cpc-backend.git
    cd nsu-cpc-backend
    ```

2. **Install Dependencies**
    ```bash
    npm install
    ```

3. **Setup Environment Variables**
    - Create a `.env` file in the root directory of the back-end project.
    - Add the following environment variables:
      ```plaintext
        MONGO_URI=your_mongo_db_connection_string
        NODE_ENV=development
        JWT_SECRET=your_jwt_secret
        SESSION_SECRET=temporary_random_values
        GOOGLE_CLIENT_ID=your_google_client_id
        GOOGLE_CLIENT_SECRET=your_google_client_secret
        CLIENT_URL=http://localhost:3000
        PORT=5000
      ```

4. **Start the Server**
    ```bash
    npm start
    ```

### Running the Application
- Ensure both the front-end and back-end servers are running.
- Open your browser and navigate to `http://localhost:3000` to see the application in action.

## Conclusion
The redesigned NSU CPC website aims to be a valuable resource for students, alumni, and employers. By incorporating modern features and technologies, the website enhances the job search and placement process, ensuring NSU remains at the forefront of student support and professional development.

