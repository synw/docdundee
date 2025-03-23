import { executeTaskCmd } from "@agent-smith/cli";

async function action(params) {
    const fileContent = params.prompt;
    const res = await executeTaskCmd({ name: "jsdoc-check", prompt: fileContent });
    //console.log("RES", res);
    const answer = res.answer.text.split("</think>")[1];
    //console.log("ANSWER", answer);
    const final = await executeTaskCmd({ name: "jsdoc-fix", prompt: fileContent, report: answer });
    return final
}

export { action }