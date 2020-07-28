const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const siswaSchema = Schema(
  {
    _id: Schema.Types.ObjectId,
    name: String,
    age: Number,
    kelas: [{ type: Schema.Types.ObjectId, ref: "Kelas" }],
  },
  { timestamps: true }
);

const Siswa = mongoose.model("Siswa", siswaSchema);
module.exports = Siswa;
