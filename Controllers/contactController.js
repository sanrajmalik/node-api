const asyncHandler = require('express-async-handler');
const errorHandler = require('../Middleware/errorHandler');
const Contact = require('../models/contactModel')
const connectDb = require("../config/dbConnection");

//@desc Get all contact
//@route Get /api/contacts
//@desc Get all contact
//@access public
const getContact = async (req, res) => {
    try {
        const contacts  = await Contact.find();
        if(contacts.length==0){
            return res.status(404).send({message:"No Contacts Found!"});
        }
        res.status(200).json(contacts);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).send({
              message: "Contact not exist with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Internal Server Error"
          });
    }
};

//@desc Get all contact
//@route Get /api/contacts
//@access public
const getContatcById = async (req, res) => {
  const id = req.params.id;
  try {
    const contact = await Contact.findById(id);
    if (!contact) {
      return res.status(404).send({
        message: "Contact not exist with id " + req.params.id,
      });
    }
    return res.status(200).json(contact);
  } catch (err) {
    if (err.kind === "ObjectId") {
      return res.status(404).send({
        message: "Contact not exist with id " + req.params.id,
      });
    }
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
};

//@desc Creat contact
//@route Post /api/contacts
//@access public
const createContact = async (req,res)=>{
    const {name,email,phone} = req.body;
    if(!name || !email || !phone){
        res.status(400)
        throw new Error("Missing information")
        //res.status(400).json({ message: "Fields Missing"});
    }
    try {
        const contact = await Contact.create({
            name,
            email,
            phone
        })
        if(!contact){
            return res.status(404).send({message:"No Contact Found!"});
        }
        res.status(200).json(contact);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).send({
              message: "Contact not exist with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Internal Server Error"
          });
    }
};

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateContact = async (req, res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    try {
        const updatedContact = await Contact.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
          );
        res.status(200).json(updatedContact);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).send({
              message: "Contact not exist with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Internal Server Error"
          });
    }
  
  };

//@desc Delete contact
//@route Delete /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req,res)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      res.status(404);
      throw new Error("Contact not found");
    }
    try {
        const updatedContact = await Contact.findByIdAndDelete(req.params.id);
        res.status(200).json(updatedContact);
    } catch (error) {
        if (error.kind === "ObjectId") {
            return res.status(404).send({
              message: "Contact not exist with id " + req.params.id,
            });
          }
          return res.status(500).send({
            message: "Internal Server Error"
          });
    }
  
});

module.exports = { getContact, getContatcById ,createContact,updateContact,deleteContact};
