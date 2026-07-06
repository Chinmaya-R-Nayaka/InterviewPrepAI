const cloudinary = require("../config/cloudinary");

const uploadResume = (buffer)=>

new Promise((resolve,reject)=>{

    cloudinary.uploader.upload_stream(

        {
            folder:"InterviewPrepAI/Resume",
            resource_type:"raw",
        },

        (err,result)=>{

            if(err) return reject(err);

            resolve(result);

        }

    ).end(buffer);

});

module.exports = uploadResume;