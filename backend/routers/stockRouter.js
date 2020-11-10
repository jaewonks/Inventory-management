import express from 'express';
import expressAsyncHandler from 'express-async-handler';
import { db } from '../server.js'

const router = express.Router();

router.get('/category', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM category', 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring category" });
        }
      }
    )
    }));

router.get('/category/:id', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM category WHERE category_id = ?', req.params.id, 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring category" });
        }
        }
    )
    }));    

router.post('/category', expressAsyncHandler( async (req,res) => {
    const category_name = req.body.name;
    if(category_name === '') {
        console.log({ error: err });
    }
    db.query(
        'INSERT INTO category VALUES (?,?,?)',[0, category_name, 'Active'], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to create category" });
        }
       }
     )
    }));  
    
router.put('/category/:id', expressAsyncHandler( async (req,res) => {
    const category_name = req.body.name;
    if(category_name === '') {
        console.log({ error: err });
    }
    db.query(
        'UPDATE category SET category_name =? WHERE category_id=?;', [category_name, req.params.id], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to update category" });
        }
        }
    )
    }));     
    
router.delete('/category/:id', expressAsyncHandler( async (req,res) => {
    const categoryId = req.params.id;
    db.query(
        'DELETE from category where category_id  = ?', categoryId,
        (err, result) => {
            if(err) {
                console.log(err);
            }
            if(result) {
            res.send(result)
            } else {
            res.send({ message: "Fail to delete category" });
            }
        }
    )
}));    

router.get('/brand', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM brand LEFT JOIN category ON categoryId = category.category_id', 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring brands" });
        }
        }
    )
    }));
    
router.get('/brand/:id', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM brand LEFT JOIN category ON categoryId = category.category_id WHERE brand_id = ?', req.params.id, 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring the brand" });
        }
        }
    )
    }));    

router.post('/brand', expressAsyncHandler( async (req,res) => {
    const category = parseInt(req.body.category);
    const brand = req.body.brand;
    if(brand === '') {
        console.log({ error: err });
    }
    db.query(
        'INSERT INTO brand VALUES (?,?,?,?)',[0, category, brand, 'Active'], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to create brand" });
        }
      }
    )
    }));   
    
router.put('/brand/:id', expressAsyncHandler( async (req,res) => {
    const id = req.params.id;
    const brand = req.body.brand;
    const category = req.body.category;
    if(brand === '') {
        console.log({ error: err });
    }
    db.query(
        'UPDATE brand SET brand_name=?, categoryId=? WHERE brand_id=?;', 
        [brand, category, id], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to update brand" });
        }
        }
    )
    })); 
    
router.delete('/brand/:id', expressAsyncHandler( async (req,res) => {
    db.query(
        'DELETE from brand where brand_id  = ?', req.params.id,
        (err, result) => {
            if(err) {
                console.log(err);
            }
            if(result) {
            res.send(result)
            } else {
            res.send({ message: "Fail to delete brand" });
            }
        }
    )
}));       
    
router.get('/', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM stock LEFT JOIN category ON categoryId = category.category_id LEFT JOIN brand ON brandId = brand.brand_id',
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring brands" });
        }
        }
    )
    }));

router.get('/:id', expressAsyncHandler( async (req,res) => {
    db.query(
        'SELECT * FROM stock LEFT JOIN category ON categoryId = category.category_id LEFT JOIN brand ON brandId = brand.brand_id WHERE stock_id = ?', req.params.id, 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to bring the stock" });
        }
        }
    )
    }));

router.put('/:id', expressAsyncHandler( async (req,res) => {
    const id = req.params.id;
    const stock = req.body.stock
    /* if(brand === '') {
        console.log({ error: err });
    } */
    // stock_no, stock_pno, stock_name, stock_desc, stock_qty, stock_location, stock_price, stock_buy_at, stock_buy_in, stock_buy_by, stock_receipt
    // stock_url, stock_created_by, stock_created_at, stock_status, categoryId, brandId
    db.query(
        'UPDATE stock SET stock_no=?, stock_pno=?, stock_name=?, stock_desc=?, stock_qty=?, stock_location=?, stock_price=?, stock_buy_at=?, stock_buy_in=?, stock_buy_by=?, stock_receipt=?, stock_url=?, stock_created_by=?, stock_created_at=?, stock_status=?, categoryId= ?, brandId=? WHERE stock_id=?',
        [stock.code, stock.pn, stock.name, stock.desc, stock.qty, stock.location, stock.price, stock.purchaseAt, stock.purchaseIn, stock.purchaser, stock.receipt, stock.url, stock.createdBy, stock.createdAt, 'Active', stock.category, stock.brand, id], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to update stock" });
        }
        }
    )
    }));    

router.post('/add', expressAsyncHandler( async (req,res) => {
    const code = req.body.code;
    const pn = req.body.pn;
    const name = req.body.name;
    const desc = req.body.desc;
    const qty = parseInt(req.body.qty);
    const location = req.body.location;
    const price = parseInt(req.body.price);
    const purchaseAt = req.body.purchaseAt;
    const purchaseIn = req.body.purchaseIn;
    const purchaser = req.body.purchaser;
    const receipt = req.body.receipt;
    const url = req.body.url;
    const createdBy = req.body.createdBy;
    const createdAt = req.body.createdAt;
    const category = parseInt(req.body.category);
    const brand = parseInt(req.body.brand);
    /* if(brand === '') {
        console.log({ error: err });
    } */
    // stock_no, stock_pno, stock_name, stock_desc, stock_qty, stock_location, stock_price, stock_buy_at, stock_buy_in, stock_buy_by, stock_receipt
    // stock_url, stock_created_by, stock_created_at, stock_status, categoryId, brandId
    db.query(
        'INSERT INTO stock VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',
        [0, code, pn, name, desc, qty, location, price, purchaseAt, purchaseIn, purchaser, receipt, url, createdBy, createdAt, 'Active', category, brand], 
        (err, result) => {
        if(err) {
            console.log({ error: err });
        }
        if(result) {
        res.send(result)
        } else {
        res.send({ message: "Fail to create stock" });
        }
        }
    )
    }));  

router.delete('/:id', expressAsyncHandler( async (req,res) => {
    db.query(
        'DELETE from stock where stock_id  = ?', req.params.id,
        (err, result) => {
            if(err) {
                console.log(err);
            }
            if(result) {
            res.send(result)
            } else {
            res.send({ message: "Fail to delete stock" });
            }
        }
    )
}));

export default router;
      

