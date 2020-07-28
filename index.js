const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Siswa = require("./model/siswa");
const Kelas = require("./model/kelas");
mongoose
  .connect("mongodb://root:root@127.0.0.1:27017/sekolah?authSource=admin", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((result) => {
    console.log("connected database");
  })
  .catch((err) => {
    console.log(err);
  });
app.get("/insertall", (req, res) => {
  const cls = new Kelas({
    _id: new mongoose.Types.ObjectId(),
    kelas: "x",
    jurusan: "Ipa",
  });

  cls.save((err) => {
    if (err) {
      console.log(err);
    }

    const sis = new Siswa({
      _id: new mongoose.Types.ObjectId(),
      name: Math.random().toString(36).substr(2, 5),
      age: 20,
      kelas: cls._id,
    });

    sis.save((err) => {
      if (err) {
        console.log(err);
      }
      res.json({ message: "success add" }).end();
    });
  });
});
app.get("/", async (req, res) => {
  try {
    const sis = await Siswa.find().populate("kelas", "jurusan");
    sis.forEach((item) => {
      console.log(item.kelas[0].jurusan);
    });
    res.json({ sis }).end();
  } catch (error) {
    res.json({ error }).end();
  }
});
app.get("/:nama", async (req, res) => {
  const { nama } = req.params;
  try {
    const one = await Siswa.findOne({ name: nama }).populate("kelas");
    res.json({ one }).end();
  } catch (error) {
    res.json({ error }).end();
  }
});
app.listen(5000, (req, res) => {
  console.log("http://localhost:5000");
});
