const mongoose = require("mongoose");

// Define the schema for an audit log
const auditLogSchema = new mongoose.Schema({
  by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  action: { type: String, required: true },
  details: { type: String, required: false },
});

// Create the model for the audit log
const AuditLog = mongoose.model("auditLogs", auditLogSchema);
