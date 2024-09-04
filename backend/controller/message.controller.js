const express = require('express');

const ConversationModel = require('../model/conversation.model.js');
const MessageModel = require('../model/message.model.js');
// for chatting
const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { message } = req.body;

        const conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        })

        if (!conversation) {
            consversation = await ConversationModel.create({
                participants: [senderId, receiverId]
            })
        }
        const newMessage = await MessageModel.create({
            senderId,
            receiverId,
            message
        })

        if (newMessage) conversation.messages.push(newMessage._id);

        await Promise.all([conversation.save(), newMessage.save()])


        // implement socket io for real time chat


        return res.status(201).json({
            newMessage,
            success: true
        })

    } catch (err) {
        console.log(err)
    }
}


const getMessage = async (req, res) => {
    try {
        const senderId = req.body;
        const receiverId = req.params.id;

        const conversation = await ConversationModel.find({
            participants: { $all: [senderId, receiverId] }
        }).populate('messages');
        if (!conversation) {
            return res.status(200).json({ success: true, messages: [] })
        };

        return res.status(200).json({ success: true, messages: conversation?.messages });



    } catch (err) {
        console.log(err)
    }
}





module.exports = { sendMessage, getMessage }