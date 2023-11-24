# Form Builder
A Full Stack MERN app for building dynamic forms with drag and drop interface &amp; to track and view the responses received in the created form.

https://easyformbuilder.netlify.app/

(Profile picture upload only works in local development as costs money in deployed server.)

![Screenshot of form builder website](https://github.com/RohanShrestha01/form-builder/assets/70142301/a4273f13-1842-46cb-aef6-b04244c8f46e)

## Installation
You need to install [pnpm](https://pnpm.io/installation) first as pnpm workspace is used for this monorepo.

```bash
npm install -g pnpm
```

Clone the project

```bash
git clone https://github.com/RohanShrestha01/form-builder.git
```

then navigate into the project

```
cd form-builder
```

Now, Install the packages

```bash
pnpm i
```

then build the shared validation package

```bash
pnpm -F @form-builder/validation build
```

Also, create .env file with the help of .env.example file for both client and server. You can use [Brevo](https://www.brevo.com/) for free SMTP server and [MongoDB Atlas](https://www.mongodb.com/atlas/database) for database.

Run the project with command

```bash
pnpm dev
```

<h2> Built with </h2>
<ul>
  <li>Frontend: <b> React, TypeScript, Tailwind, React Hook Form, Zod, ShadcnUI, React Router, DND Kit, Tanstack Query, Tanstack Table, Tiptap, React Dropzone, React Easy Crop, Zustand </b></li>
  <li>Backend:  <b> Node, Express, TypeScript, Nodemailer, Multer, JWT </b> </li>
  <li>Database: <b> MongoDB, Mongoose </b> </li>
</ul>

<h2> Features </h2>
<ul>
  <li> JWT Authentication along with Protected Routes, Refresh Tokens, reuse detection and rotation. </li>
  <li> Logout, Change password and delete account functionalities. </li>
  <li> Email sending functionality after signup and while resetting password using Nodemailer. </li>
  <li> Profile picture upload with drag n drop and crop functionality. </li>
  <li> Implemented error logging mechanisms for easier troubleshooting and maintenance. </li>
  <li> Implemented proper error handling and user feedback mechanisms. </li>
  <li> Dynamic forms can be created using different form elements by dragging and dropping. </li>
  <li> CRUD operations and search functionality on the form. </li>
  <li> Functionality to submit the form and view the responses on the form. </li>
  <li> Included various form elements like WYSIWYG editor, Calendar, Date Range Picker etc. </li>
</ul>

<h2> API </h2>

<h4> Auth </h4>
<ul>
  <li> <b>POST</b> /api/v1/auth/signup </li>
  <li> <b>POST</b> /api/v1/auth/login </li>
  <li> <b>GET</b> /api/v1/auth/refresh </li>
  <li> <b>GET</b> /api/v1/auth/logout </li>
  <li> <b>POST</b> /api/v1/auth/forgot-password </li>
  <li> <b>PATCH</b> /api/v1/auth/reset-password/:token </li>
</ul>

<h4> User </h4>
<ul>
  <li> <b>PATCH</b> /api/v1/user/change-password </li>
  <li> <b>PATCH</b> /api/v1/user/profile </li>
  <li> <b>GET</b> /api/v1/user/profile </li>
  <li> <b>DELETE</b> /api/v1/user/delete-account </li>
</ul>

<h4> Form </h4>
<ul>
  <li> <b>GET</b> /api/v1/forms?page=0&pageSize=10&sort=-name&search=form </li>
  <li> <b>GET</b> /api/v1/forms/:id </li>
  <li> <b>POST</b> /api/v1/forms </li>
  <li> <b>PATCH</b> /api/v1/forms/:id </li>
  <li> <b>PATCH</b> /api/v1/forms/bulk-delete </li>
  <li> <b>DELETE</b> /api/v1/forms/:id </li>
</ul>

<h4> Form Response </h4>
<ul>
  <li> <b>GET</b> /api/v1/forms/:id/responses </li>
  <li> <b>POST</b> /api/v1/forms/:id/responses </li>
</ul>
