const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Siswa = require("./model/siswa");
const Rank = require("./model/ranking");
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

app.get("/insertrank", async (req, res) => {
  try {
    const rank = new Rank({
      _id: new mongoose.Types.ObjectId(),
      min_nilai: 50,
      max_nilai: 69,
      rank: "medium",
    });
    const result = await rank.save();
    res.json({ result }).end();
  } catch (error) {
    res.json({ error }).end();
  }
});
app.get("/insertsiswa", async (req, res) => {
  try {
    const nilai = 12;
    const ranked = await ranking();
    let rank = ranked.filter(({ min_nilai, max_nilai, rank }) => {
      return showrank(nilai, min_nilai, max_nilai, rank);
    });
    const siswa = new Siswa({
      _id: mongoose.Types.ObjectId(),
      Name: "asa",
      Nilai: nilai,
      Rank: rank[0].rank,
    });
    await siswa.save();
    res.end();
  } catch (error) {
    console.log(error);
  }
});
const ranking = async () => {
  try {
    const result = await Rank.find();
    return result;
  } catch (error) {
    console.log(err);
  }
};
const showrank = (nilai, min, max, rank) => {
  if ((nilai >= min) & (nilai <= max)) {
    return rank;
  }
};
app.get("/", async (req, res) => {
  try {
    const sis = await Siswa.find().populate("Rank");
    res.json({ sis }).end();
  } catch (error) {
    res.json({ error }).end();
  }
});

app.listen(5000, (req, res) => {
  console.log("http://localhost:5000");
});
