const resumeAnalysisPrompt = (resume) => `
You are an ATS Resume Expert.

Analyze the resume and respond ONLY with valid JSON.

{
"score":0,
"atsScore":0,
"skills":[],
"missingSkills":[],
"strengths":[],
"weaknesses":[],
"suggestions":[]
}

Resume:
${resume}
`;

module.exports = { resumeAnalysisPrompt };