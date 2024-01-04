const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize, DataTypes } = require('sequelize');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const sequelize = new Sequelize('data_absensi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

const Karyawan = sequelize.define('Karyawans', { 
  nomor_induk: {
    type: DataTypes.STRING,
    allowNull: false,
    primaryKey: true,
  },
  nama: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alamat: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tanggal_lahir: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  tanggal_bergabung: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
});

const Cuti = sequelize.define('Cutis', { 
  tanggal_cuti: {
    type: DataTypes.DATEONLY,
    allowNull: false,
  },
  lama_cuti: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  keterangan: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

Karyawan.hasMany(Cuti, { foreignKey: 'nomor_induk' });
Cuti.belongsTo(Karyawan, { foreignKey: 'nomor_induk' });

sequelize.sync();

app.post('/karyawan', async (req, res) => {
  try {
    const karyawan = await Karyawan.create(req.body);
    res.json(karyawan);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.put('/karyawan/:nomor_induk', async (req, res) => {
  const { nomor_induk } = req.params;
  try {
    const [updatedRows] = await Karyawan.update(req.body, {
      where: { nomor_induk },
    });
    if (updatedRows > 0) {
      res.json({ message: 'Karyawan updated successfully' });
    } else {
      res.status(404).json({ error: 'Karyawan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.delete('/karyawan/:nomor_induk', async (req, res) => {
  const { nomor_induk } = req.params;
  try {
    const deletedRows = await Karyawan.destroy({
      where: { nomor_induk },
    });
    if (deletedRows > 0) {
      res.json({ message: 'Karyawan deleted successfully' });
    } else {
      res.status(404).json({ error: 'Karyawan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/karyawan', async (req, res) => {
  try {
    let karyawanList;

    const { sortBy } = req.query;

    if (sortBy === 'tanggal_lahir') {
      karyawanList = await Karyawan.findAll({
        order: [['tanggal_lahir', 'ASC']],
      });
    } else if (sortBy === 'nama') {
      karyawanList = await Karyawan.findAll({
        order: [['nama', 'ASC']],
      });
    } else {
      karyawanList = await Karyawan.findAll();
    }

    res.json(karyawanList);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/karyawan/:nomor_induk', async (req, res) => {
  const { nomor_induk } = req.params;
  try {
    const karyawan = await Karyawan.findOne({
      where: { nomor_induk },
      include: [{ model: Cuti }],
    });

    if (karyawan) {
      res.json(karyawan);
    } else {
      res.status(404).json({ error: 'Karyawan not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});