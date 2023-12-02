# Bug Tracker Web App

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Introduction

The Bug Tracker Web App is a comprehensive web application designed to streamline the bug tracking process for developers and teams. It provides a user-friendly interface for creating projects and tracking the bugs within those projects.

## Features

- **Project Management:** Create and manage projects with ease. Each project has its own dedicated space for tracking related tickets.

- **Ticket Creation:** Add detailed tickets for each bug, including title, description, labels and author. This facilitates clear communication and efficient collaboration.

- **Search and filter:** Search bugs using their titles and description, and filter them using labels and authors.

- **User-Friendly Interface:** The application features an intuitive and user-friendly interface, ensuring a seamless bug tracking experience for developers.

## Getting Started

### Prerequisites

Ensure you have the following prerequisites installed on your machine:

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/) (Node Package Manager)

### Installation

1. **Clone the Repository:**

   ```
    git clone https://github.com/KaranveerManhas/bug-tracker-app.git
    ```
2. **Navigate to the Project Directory**

    ```
    cd bug-tracker-app
    ```
3. **Install dependencies**
    ```
    npm install
    ```
4. **Setup Environment variables**
    **The project needs the following environment variables to work:**

    ```
    MONGODB_URI
    PASSPORT_GITHUB_CLIENT_ID
    PASSPORT_GITHUB_CLIENT_SECRET
    PASSPORT_GITHUB_CALLBACK_URL
    SESSION_NAME
    SESSION_SECRET_KEY
    ```

### Running the App
1. **Run the app**
    ```
    npm start
    ```
2. **Access the App:**
    Open your web browser and go to `http:///localhost:5000` to access the Bug Tracker Web App.

### Usage

1. **Create a Project:**

    - **Click on the "New Project" button.**
    - **Fill in the project details.**
    - **Click "Create Project" to save.**

2. **Add a Ticket:**
    - **Inside a project, click on the "New Ticket" button.**
    - **Provide ticket details (title, description, status, priority).**
    - **Click "Create Ticket" to save.**

3. **Search:**
    - **You can search bugs listed on the project page using their titles and description**
    - **You can also filter bugs based on their labels and authors**


### Contributing

I welcome contributions from the community. To contribute to the Bug Tracker Web App, please follow these steps:

1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make changes and commit them.
4. Push your changes to your fork.
5. Submit a pull request.

### License
This project is licensed under the MIT License.

### Contact
For any questions or inquiries, please contact the project maintainer:

- Karanveer Manhas
    - GitHub: KaranveerManhas

Thank you for using Bug Tracker Web App!