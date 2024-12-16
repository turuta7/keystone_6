const { randomBytes } = require("crypto");
const { createAuth } = require("@keystone-6/auth");

// see https://keystonejs.com/docs/apis/session for the session docs
const { statelessSessions } = require("@keystone-6/core/session");

// withAuth is a function we can use to wrap our base configuration
const { withAuth } = createAuth({
  listKey: "User",
  identityField: "email",

  // this is a GraphQL query fragment for fetching what data will be attached to a context.session
  //   this can be helpful for when you are writing your access control functions
  //   you can find out more at https://keystonejs.com/docs/guides/auth-and-access-control
  sessionData: "name createdAt",
  secretField: "password",

  // WARNING: remove initFirstItem functionality in production
  //   see https://keystonejs.com/docs/config/auth#init-first-item for more
  initFirstItem: {
    fields: ["name", "email", "password"],
  },
});

// statelessSessions uses cookies for session tracking
//   these cookies have an expiry, in seconds
//   we use an expiry of 30 days for this starter
const sessionMaxAge = 60 * 60 * 24 * 30;

// you can find out more at https://keystonejs.com/docs/apis/session#session-api
const session = statelessSessions({
  maxAge: sessionMaxAge,
  secret: process.env.SESSION_SECRET,
});

module.exports = { withAuth, session };
