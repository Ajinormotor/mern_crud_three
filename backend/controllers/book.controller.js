
import {v2 as cloudinary}  from "cloudinary"
import jwt from "jsonwebtoken"
import User from "../models/user.model.js";
import Book from "../models/book.model.js";

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_SEC
})

export const addBooks = async(req,res) => {
 const {image,title, subtitle, author,link,review} = req.body
 const {token} = req.cookies;

 if(!token){
    return res.status(401).json({
        message: "No token provided"
    })
 }

 try {
const decoded = jwt.verify(token, process.env.JWT_SECRET)

if(!decoded){
    return res.status(401).json({
        message: "Invalid Token"
    })
}


if (!image) {
    return res.status(400).json({
      message: "No image provided"
    });
  }
    const imageResponse = await cloudinary.uploader.upload(image, {
        folder: "library",
        resource_type: "auto"
    })

   

    const userDoc = await User.findById(decoded.id).select("-password");

    const book = await Book.create({
        image: imageResponse.secure_url,
        title, subtitle, author, user: userDoc,
        link, review
    })

    return res.status(201).json({
        message: "Book added successfully",
        book
    })
    //
    
 } catch (error) {
    console.error("Error in addBooks:", error); 
    return res.status(500).json({
        error: "Internal server error",
        message: error.message
    })
 }
}

export const fetchBooks = async(req,res) => {

try {
    const books = await Book.find().sort({ createdAt: -1});

    return res.status(200).json({
        books
    })
    
} catch (error) {
    console.error(error)
    return res.status(500).json({
        message: error.message
    })
}
}

export const fetchSingBook = async(req,res) => {
    const {id} = req.params

    try {


        const book = await Book.findById(id).populate('user', ['username']);

        if(!book){
            return res.status(404).json({
                message: "Book Not found"
            })
        }

        return res.status(200).json({
            book
        })
        
    } catch (error) {
        console.error("Error:", error)
        return res.status(500).json({
            message:error.message
        })
        
    }
}


export const updateBook = async(req,res) => {
    const {id} = req.params
    const {image,title, subtitle, author,link,review} = req.body
    const {token} = req.cookies

    
 if(!token){
    return res.status(401).json({
        message: "No token provided"
    })
 }


    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

if(!decoded){
    return res.status(401).json({
        message: "Invalid Token"
    })
}

const book = await Book.findById(id)


if(image){
    const parts = book.image.split('/')
        const fileName = parts[parts.length-1]
        const imageId =   fileName.split('/')[0]
        cloudinary.uploader.destroy(`library/${imageId}`)
        .then((result) => console.log("result", result))

        const imageResponse = cloudinary.uploader.upload(image, {
            folder: "library"
        })
        
        
      
        
        const updatedBook = await Book.findByIdAndUpdate(id,{
            image: imageResponse.secure_url,
            title,subtitle,
            author, link, review
        
        })
        
        
        
}

const updatedBook = await Book.findByIdAndUpdate(id,{

    title,subtitle,
    author, link, review

})

return res.status(200).json({
    message: 'Book updated successfully',
    book : updatedBook
})



        
    } catch (error) {
        console.error("Error in updateBooks:", error); 
        return res.status(500).json({
            error: "Internal server error",
            message: error.message
        })
        
    }
}


export const deleteBook = async(req,res) => {

    const {id} = req.params
    const {token} = req.cookies
    if(!token){
        return res.status(401).json({ messaage: 'No token provided'})
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded){
            return res.status(401).json({ messaage: 'No token provided'})
        }
const book = await Book.findById(id)

const parts = book.image.split('/')
    const filename = parts[parts.length-1]
    const imageId = filename.split(",")[0];
    cloudinary.uploader.destroy(`library/${imageId}`)
    .then((result) => console.log("result", result))

    await Book.findByIdAndDelete(id)


return res.status(200).json({
    message: "Book deleted successfully"
})

        
    } catch (error) {
        console.error("Error:", error)
        return res.status(500).json({
            message:error.message
        })
    }
}



export const searchBooks = async(req,res) => {
 

    try {
        const searchTerm =  req.query.searchTerm || '';

        const books = await Book.find({
            title: { $regex: searchTerm, $options: "i"}
        }).sort({createdAt: -1})

        return res.status(200).json({books});

    } catch (error) {
        console.error(error.message)
        return res.json(500).json({
            message:error.message
        })
        
    }



}