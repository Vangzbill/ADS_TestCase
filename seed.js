const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('data_absensi', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
  });

const Karyawan = sequelize.define('Karyawan', {
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

const Cuti = sequelize.define('Cuti', {
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
