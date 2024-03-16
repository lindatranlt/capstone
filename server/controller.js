require('dotenv').config();
const {CONNECTION_STRING} = process.env;
const Sequelize = require('sequelize');

const sequelize = new Sequelize(CONNECTION_STRING);

module.exports = {
    seed: (req, res) => {
        sequelize.query(`
            drop table if exists comments;

            create table comments (
                comment_id serial primary key,
                comment_p varchar
            );



        `).then(() => {
            console.log('DB seeded!');
            res.sendStatus(200);
        }).catch(err => console.log('error seeding DB', err))
    },
    getComments: (req, res) => {
        const query = `
        select * from comments;`
        sequelize.query(query)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
    },
    createComment: (req, res) => {
        let {comment_p} = req.body;
        const query = `
        INSERT INTO comments (comment_p)
        VALUES ('${comment_p}')
    `;
    
    sequelize.query(query)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
        .catch(err => {
            console.log(err);
            res.sendStatus(500);
        });
    },
    updateComment: (req, res) => {
        let {comment_p,} = req.body;
        sequelize.query(`update comments set comment_p = '${comment_p}';`)
            .then(() => res.sendStatus(200))
            .catch(err => console.log(err))
    },
    deleteComment : (req, res) => {
        const {id} = req.params;
        const query = `
        delete from comments
        WHERE comment_id = ${id}
        `
        sequelize.query(query)
        .then(dbRes => {
            res.status(200).send(dbRes[0]);
        })
    },
}
