# News Frontend

## Hosted Version

You can find the deployed version of this application here:  
[https://nc-news-by-mwm.netlify.app/](https://nc-news-by-mwm.netlify.app/)

## Project Overview

This is the front-end application for a Reddit-style news site. It allows users to browse articles by topic, view an article with its comments, post new comments and articles, vote on articles and comments, and delete their own comments.  
The application interacts with the [News API](https://github.com/MWM02/nc-news-be.git) (back end) to fetch and manipulate data.

**Note:** The app uses **React Context** to manage the logged-in user state. A user can be selected to simulate login behavior across different pages of the app and is currently set to **tickle122**.

## Getting Started

### Prerequisites

Ensure you have the following installed before proceeding:

- **Node.js** v16 or later
- **Visual Studio Code** (or any IDE of your choice)

### Installation & Setup

Follow these steps to set up the project locally using the Command Line Interface:

1. **Clone the repository**:

   ```
   git clone https://github.com/MWM02/nc-news-fe.git
   ```

2. **Navigate into the project directory**:

   ```
   cd nc-new-fe
   ```

3. **Install dependencies**:

   ```
   npm install
   ```

4. **Start the development server**:

   ```
   npm run dev
   ```

- The application should open automatically at [http://localhost:5173](http://localhost:5173) (or the port your environment specifies).

## Tech Stack

This project was built using the following technologies:

- **React.js** — JavaScript library for building user interfaces
- **Vite** — Front-end tooling for fast development
- **Axios** — Promise-based HTTP client for the browser
- **Netlify** — Hosting service for deployment

## Related Links

- **Backend Repository**: [News API](https://github.com/MWM02/nc-news-be.git)

---

## Additional Information

This portfolio project was created as part of a Digital Skills Bootcamp in Software Engineering provided by [Northcoders](https://northcoders.com/)
