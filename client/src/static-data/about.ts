const projectObjectives = [
  "The primary objective is to implement a crud using express on back-end, mongodb atlas as data-tier where admin user creates/add flight with necessary info against which user can search flight by their query (destination, date, origin of the flight) and book the flight. ",
];
const projectFeatures = [
  "Add,Edit,Delete flight (admin only, protected via auth middleware)",
  "book a flight (normal user but after login)",
  "search and view flight info (without authentication)",
];

const usedTechAndTools = {
  frontEnd: ["react", "redux", "tailwind", "custom shared-component"],
  backEnd: ["mongoose", "nodemailer", "crypto"],
  dataTier: ["mongodb with mongoose"],
};

export { projectObjectives, projectFeatures, usedTechAndTools };
