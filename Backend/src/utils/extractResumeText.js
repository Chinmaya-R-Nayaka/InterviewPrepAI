// const pdf = require("pdf-parse");

// const extractResumeText = async (buffer) => {
//     const data = await pdf(buffer);
//     return data.text;
// };

// module.exports = extractResumeText;


// tempo
const pdf=require("pdf-parse");

console.log(pdf);

const extractResumeText=async(buffer)=>{
    const data=await pdf(buffer);
    return data.text;
};

module.exports=extractResumeText;