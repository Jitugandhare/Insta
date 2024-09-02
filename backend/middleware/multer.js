const express = require('express')
const multer  = require('multer')

const upload=multer({
    storage:multer.memoryStorage()
})

module.exports=upload;
