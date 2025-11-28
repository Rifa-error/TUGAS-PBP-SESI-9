const express = require('express');
const db1 = require('./db1');
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.get('/buku', (req, res) => {
    db1.query('SELECT * FROM buku', (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.get('/buku/:id', (req, res) => {
    const id = req.params.id;

    db1.query(
        'SELECT * FROM buku WHERE id = ?',
        [id],
        (err, result) => {
            if (err) throw err;

            if (result.length === 0) {
                return res.status(404).json({ message: 'Buku tidak ditemukan' });
            }

            res.json(result[0]);
        }
    );
});

app.post('/buku', (req, res) => {
    const { id, judul, penulis, tahun } = req.body;

    db1.query(
        'INSERT INTO buku (id, judul, penulis, tahun) VALUES (?, ?, ?, ?)',
        [id, judul, penulis, tahun],
        (err, result) => {
            if (err) throw err;
            res.json({
                message: 'Buku ditambahkan!',
                id: result.insertId
            });
        }
    );
});

app.put('/buku/:id', (req, res) => {
    const { judul, penulis, tahun } = req.body;
    const id = req.params.id;

    db1.query(
        'UPDATE buku SET judul=?, penulis=?, tahun=? WHERE id=?',
        [judul, penulis, tahun, id],
        (err) => {
            if (err) throw err;
            res.send(`Buku ID ${id} berhasil diupdate`);
        }
    );
});


app.delete('/buku/:id', (req, res) => {
    const id = req.params.id;

    db1.query(
        'DELETE FROM buku WHERE id=?',
        [id],
        (err) => {
            if (err) throw err;
            res.send(`Buku ID ${id} berhasil dihapus`);
        }
    );
});

app.listen(3000, () => console.log('Server berjalan di port 3000'));
