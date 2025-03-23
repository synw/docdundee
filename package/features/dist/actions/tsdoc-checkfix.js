import { executeTaskCmd } from "@agent-smith/cli";

async function action(params, options) {
    //console.log("OPTS", options);
    const isWorkflow = !Array.isArray(params);
    let fileContent;
    if (!isWorkflow) {
        fileContent = params[0];
    } else {
        fileContent = params.prompt
    }

    const res = await executeTaskCmd({ name: "tsdoc-check", prompt: fileContent });
    //console.log("RES", res);
    const answer = res.answer.text.split("</think>")[1];
    console.log("\n", res.answer.stats);
    if (answer.includes("Everything is correct")) {
        res.answer.text = "Everything is correct";
        return res.answer
    }
    //console.log("ANSWER", answer);
    const final = await executeTaskCmd({
        name: "tsdoc-fix",
        prompt: fileContent,
        report: answer,
    });
    //console.log("FINAL", final)
    return final
}

export { action }