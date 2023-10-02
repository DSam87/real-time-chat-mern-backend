const corsOptions = {
  origin: ["http://localhost:3500"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
};

module.exports = corsOptions;
