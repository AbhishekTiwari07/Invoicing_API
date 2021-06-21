const router = require('express').Router()
const generateMail = require('./mail')
const nodemailer = require('nodemailer')
const Invoice = require('../models/invoice')

router.post('/mail/:id', async (req,res)=>{
    try{
        const id = req.params.id
        const invoice = await Invoice.findById(id)
        const mail = generateMail(invoice)

        let transporter = nodemailer.createTransport({
            host:"smtp.mail.yahoo.com",
            port: 465,
            secure: true,
            auth: {
              user: process.env.EMAIL, 
              pass: process.env.PASSWORD, 
            },
          });

        let info = await transporter.sendMail({
            from: 'abc@abc',
            to: invoice.email, 
            subject: "Invoice",
            text: "PFA Invoice",
            html: mail, 
        });

        res.send(mail)
    }
    catch(e){
        res.json({
            message: e.message
        })
    }
})

router.get('/', async (req,res)=>{
    try{
        const status = req.query.status
        if(!status)
            status = 'late'
        const result = await Invoice.find({status})
        res.json(result)
    }
    catch(e){
        res.json({
            message : e.message
        })
    }
})

router.get('/all', async (req,res)=>{
    try{
        const result = await Invoice.find()
        res.json(result)
    }
    catch(e){
        res.json({
            message : e.message
        })
    }
})

router.post('/new', async (req,res)=>{
    try{
        const invoice = new Invoice(req.body)
        const result = await invoice.save()
        res.json(result)
    }
    catch(e){
        res.json({
            message : e.message
        })
    }
})

router.post('/update/:id', async (req,res)=>{
    try{
        const result = await Invoice.findByIdAndUpdate(req.params.id,{
            $set: req.body,
            new:false
        })
        
        res.json(result)
    }
    catch(e){
        res.json({
            message : e.message
        })
    }
})

module.exports = router