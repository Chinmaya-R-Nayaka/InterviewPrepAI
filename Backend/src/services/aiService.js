const ai = require("../config/gemini");

const sleep=(ms)=>new Promise(resolve=>setTimeout(resolve,ms));

const generateAIResponse = async (prompt) => {
    for(let attempt=1;attempt<=3;attempt++){
        try{
                const response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: prompt
            });
            return response.text;
        }
        catch(err){
            if(err.status===503&&attempt<3){
                console.log(`Gemini busy... retry ${attempt}`);
                await sleep(2000);
                continue;
            }
            throw err;
        }
    }
};

module.exports = { generateAIResponse };