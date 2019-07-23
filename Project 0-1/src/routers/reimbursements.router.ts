import express from 'express';
import * as reDao from '../daos/sql-reimbursement.dao';


// the user router represents a subset of the application
// for all enpoints starting with /users
export const reimbursementsRouter= express.Router();
reimbursementsRouter.get('', [
    
    //   authMiddleware('finance-manager','admin'),
       async (req, res) => {
         const users = await reDao.findAll();
            res.json(users);
       }
   ]);

reimbursementsRouter.get('/status/:status_id', async (req, res) => {
    
   const reimbursement = await reDao.findByStatusId(+req.params.status_id);
    res.json(reimbursement);
});

reimbursementsRouter.get('/author/:user_id', async (req, res) => {
    const reimbursement = await reDao.findByAuthor(+req.params.user_id);
    res.json(reimbursement);
});

reimbursementsRouter.post('', async (req,res) => {
    const reimbursement = req.body;
    if (!reimbursement) {
        res.sendStatus(400);
    } else {
        const id = await reDao.save(reimbursement);
        if (!id) {
            res.sendStatus(400);
        } else {
            reimbursement.id = id;
            res.status(201); // created status code
            res.json(reimbursement);
        }
    }
});

reimbursementsRouter.patch('', async (req, res) => {

    const updatedre = await reDao.update(req.body);
    res.json(updatedre);
    
});