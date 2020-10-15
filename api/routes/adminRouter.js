const AdminBro = require('admin-bro')
const AdminBroExpress = require('admin-bro-expressjs')
const AdminBroMongoose = require('admin-bro-mongoose')
const User = require('../models/userModel');
const mongoose = require('mongoose')

AdminBro.registerAdapter(AdminBroMongoose)

const canModifyUsers = ({ currentAdmin }) => currentAdmin.isAdmin//currentAdmin && currentAdmin.isAdmin === true;

var adminBro = new AdminBro({
  databases: [mongoose],
  rootPath: '/admin',
  resources: [
    { resource: User, 
      options: {
        parent: {
          name: 'Admin Content',
          icon: 'fas fa-cogs',
        },
      }
    }
  ],
  branding: {
    companyName: 'Greenhouse API',
    softwareBrothers: false,
  },
})

const ADMIN = {
  email: process.env.ADMIN_EMAIL || 'ahidalgoa1310@gmail.com',
  password: process.env.ADMIN_PASSWORD || '123',
}

const CLIENT = {
  email: process.env.ADMIN_EMAIL || 'laurapiedra@gmail.com',
  password: process.env.ADMIN_PASSWORD || '123',
}

const router = AdminBroExpress.buildAuthenticatedRouter(adminBro, {
  cookieName: process.env.ADMIN_COOKIE_NAME || 'admin-bro',
  cookiePassword: process.env.ADMIN_COOKIE_PASS || 'supersecret-and-long-password-for-a-cookie-in-the-browser',
  authenticate: async (email, password) => {
    if (email === ADMIN.email && password === ADMIN.password) {
      return ADMIN
    }
    adminBro = new AdminBro({ resources: [{
      resource: User, 
      options: {
        parent: {
          name: 'Admin Content',
          icon: 'fas fa-cogs',
        },
        actions: { 
          list: { isAccessible: false },
          edit: { isAccessible: false },
          delete: { isAccessible: false },
          show: { isAccessible: false },
          new: { isAccessible: false },
        }
      }
    }]})
    return CLIENT
  }
})

module.exports = router