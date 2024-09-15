const express = require('express');

const ConversationModel = require('../model/conversation.model.js');
const MessageModel = require('../model/message.model.js');
const { getReceiverSocketId } = require('../socket/socket.js');
// for chatting
const sendMessage = async (req, res) => {
    try {
        const senderId = req.id;
        const receiverId = req.params.id;
        const { textMessage: message } = req.body;
        

        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });

        // If the conversation does not exist, create a new one
        if (!conversation) {
            conversation = await ConversationModel.create({
                participants: [senderId, receiverId],
                messages: [] // Initialize messages array
            });
        }

        // Create the new message
        const newMessage = await MessageModel.create({
            senderId,
            receiverId,
            message
        });

        // Ensure the messages array exists before pushing
        if (!conversation.messages) {
            conversation.messages = [];
        }
        conversation.messages.push(newMessage?._id);

        // Save conversation and new message
        await Promise.all([conversation.save(), newMessage.save()]);

        // Implement socket.io for real-time chat
        const receiverSocketId = getReceiverSocketId(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit('newMessage', newMessage);
        }

        return res.status(201).json({
            newMessage,
            success: true
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ success: false, error: err.message });
    }
};



const getMessage = async (req, res) => {
    try {
        const senderId = req.body;
        const receiverId = req.params.id;

        const conversation = await ConversationModel.findOne({
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