const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:3001', 'https://www.herman.goldberg.api.crabdance.com/', 'https://www.herman.goldberg.crabdance.com'],
  credentials: true,
};

module.exports = corsOptions;
