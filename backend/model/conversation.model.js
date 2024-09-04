const mongoose=require("mongoose");

const conversationSchema=new mongoose.Schema({
    participants:[{type:mongoose.Schema.Types.ObjectId,
    ref:"User"
    }],

    messages:[{
        typw:mongoose.Schema.Types.ObjectId,
        ref:"Message"
    }]
})

const ConversationModel=mongoose.model("Conversation",conversationSchema);

module.exports=ConversationModel;