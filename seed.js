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

(async() => {
  try {
    await Karyawan.bulkCreate([
      {
        nomor_induk: 'IP06001',
        nama: 'Agus',
        alamat: 'Jln Gaja Mada no 12, Surabaya',
        tanggal_lahir: '1980-01-11',
        tanggal_bergabung: '2005-08-07',
      },
      {
        nomor_induk: 'IP06002',
        nama: 'Amin',
        alamat: 'Jln Imam Bonjol no 11, Mojokerto',
        tanggal_lahir: '1977-09-03',
        tanggal_bergabung: '2005-08-07',
      },
      {
        nomor_induk: 'IP06003',
        nama: 'Yusuf',
        alamat: 'Jln A Yani Raya 15 No 14 Malang',
        tanggal_lahir: '1973-08-09',
        tanggal_bergabung: '2006-08-07',
      },
      {
        nomor_induk: 'IP06004',
        nama: 'Alyssa',
        alamat: 'Jln Bungur Sari V no 166, Bandung',
        tanggal_lahir: '1983-03-18',
        tanggal_bergabung: '2006-09-06',
      },
      {
        nomor_induk: 'IP06005',
        nama: 'Maulana',
        alamat: 'Jln Candi Agung, No 78 Gg 5, Jakarta',
        tanggal_lahir: '1978-10-10',
        tanggal_bergabung: '2006-09-10',
      },
      {
        nomor_induk: 'IP06006',
        nama: 'Agfika',
        alamat: 'Jln Nangka, Jakarta Timur',
        tanggal_lahir: '1979-02-07',
        tanggal_bergabung: '2007-01-02',
      },
      {
        nomor_induk: 'IP06007',
        nama: 'James',
        alamat: 'Jln Merpati, 8 Surabaya',
        tanggal_lahir: '1989-05-18',
        tanggal_bergabung: '2007-04-04',
      },
      {
        nomor_induk: 'IP06008',
        nama: 'Octavanus',
        alamat: 'Jln A Yani 17, B 08 Sidoarjo',
        tanggal_lahir: '1985-04-14',
        tanggal_bergabung: '2007-05-19',
      },
      {
        nomor_induk: 'IP06009',
        nama: 'Nugroho',
        alamat: 'Jln Duren tiga 167, Jakarta Selatan',
        tanggal_lahir: '1984-01-01',
        tanggal_bergabung: '2008-01-16',
      },
      {
        nomor_induk: 'IP06010',
        nama: 'Raisa',
        alamat: 'Jln Kelapa Sawit, Jakarta Selatan',
        tanggal_lahir: '1990-12-17',
        tanggal_bergabung: '2008-08-16',
      }
  ]);

  await Cuti.bulkCreate([
    {
      nomor_induk: 'IP06001',
      tanggal_cuti: '2020-08-02',
      lama_cuti: 2,
      keterangan: 'Acara Keluarga',
    },
    {
      nomor_induk: 'IP06001',
      tanggal_cuti: '2020-08-18',
      lama_cuti: 2,
      keterangan: 'Anak Sakit',
    },
    {
      nomor_induk: 'IP06006',
      tanggal_cuti: '2020-08-19',
      lama_cuti: 1,
      keterangan: 'Nenek Sakit',
    },
    {
      nomor_induk: 'IP06007',
      tanggal_cuti: '2020-08-23',
      lama_cuti: 1,
      keterangan: 'Sakit',
    },
    {
      nomor_induk: 'IP06004',
      tanggal_cuti: '2020-08-29',
      lama_cuti: 5,
      keterangan: 'Menikah',
    },
    {
      nomor_induk: 'IP06003',
      tanggal_cuti: '2020-08-30',
      lama_cuti: 2,
      keterangan: 'Acara Keluarga',
    },
  ]);
    console.log('Data seeded successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error.message);
    process.exit(1);
  }
})();