# Bill Split

Easy way to split bill.

Built on top of Node.js using Express 4 with React, Redux, Webpack and Postgres.

## Demo site:
coming soon...

## Table of Contents

1. [Instructions](#instructions)
2. [Contributing](#contributing)

## Instructions

#### Databases

**Install Postgres as your database**:

```bash
# Update brew formulae
brew update
# Install Postgres
brew install postgres
```

**Run your Postgres server**
```bash
postgres -D /usr/local/var/postgres
```

**Setup your postgres database**
```bash
createuser root
createdb bill_split_development # or test/production
npm run sequelize db:migrate
```

#### Dependencies And Development Server

**Installation**
```bash
# Install node modules - this includes those for production and development
# You only need to do this once :)
npm install
```

**Development Server**
```bash
# Starts the server with Hot Reloading
# Run webpack through webpack.config.dev.js
npm run dev

```

## Contributing

[Airbnb's Style Guide](https://github.com/airbnb/javascript)
[Airbnb's React Style Guide](https://github.com/airbnb/javascript/tree/master/react)
[bendc's frontend guidelines](https://github.com/bendc/frontend-guidelines)
