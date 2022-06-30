# Authentication-Model

[Preview Link](https://auth-model.netlify.app/)

- Template for authentication in web apps.
- APIs used from [MockBee](https://mockbee.netlify.app/).
- Framework used - React.
- Notification toasts using [react-toastify](https://fkhadra.github.io/react-toastify/introduction).
<br><br>


### Features:
- Basic routing with public and private routes - using react-router-dom.
- Signup and login.
- Guest login.
- Toasts for:
  - Successful signup/login/logout.
  - Empty field prompts.
  - Email already present (signup).
  - Email does not exist (login).
  - Incorrect credentials (login).
- Prompts for: 
  - Diffrent password and confirm-password (signup).
  - Password length less than needed.
- Hide and show password. 
- Logout.
<br><br>
---
<br><br>


### Note:
- For apps where all pages are private no changes in code needed. After signup user will be directed to home page.
- For apps that have public navigation - like ecommerce, login page will be prompted when user tries to access any private page like cart/wishlist or when adding item to cart etc. In such case if user in not logged in and needs to signup, the user should be directed to page they are currently on. Thus changes in code (navigate) needed.
