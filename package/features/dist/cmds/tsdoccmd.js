import select from '@inquirer/select';
import {
    execute, executeWorkflowCmd, writeToClipboard, pingCmd,
    executeActionCmd,
    executeTaskCmd
} from "@agent-smith/cli";

const choices = [
    {
        name: 'Double check',
        value: 'check',
        description: 'Analyze the result and report',
    },
    {
        name: 'View the diff',
        value: 'diff',
        description: 'View the diff from the code',
    },
    {
        name: 'Overwrite the file',
        value: 'write',
        description: 'Overwrite the file with the new code',
    },
    {
        name: 'Copy',
        value: 'copy',
        description: 'Copy the code to the clipboard',
    },
    {
        name: 'Cancel',
        value: 'cancel',
        description: 'Cancel all',
    },
];

const secondChoices = [
    {
        name: 'Fix the code',
        value: 'fix',
        description: 'Fix the code according to the report',
    },
    {
        name: 'View the diff',
        value: 'diff',
        description: 'View the diff from the code',
    },
    {
        name: 'Overwrite the file',
        value: 'write',
        description: 'Overwrite the file with the new code',
    },
    {
        name: 'Copy',
        value: 'copy',
        description: 'Copy the code to the clipboard',
    },
    {
        name: 'Cancel',
        value: 'cancel',
        description: 'Cancel all',
    },
];

async function processAnswer(filePath, newCode, oldCode) {
    const answer = await select({
        message: 'Select an action',
        default: "check",
        choices: choices,
    });
    switch (answer) {
        case "copy":
            writeToClipboard(newCode);
            break
        case "diff":
            console.log("git diff", filePath);
            const diff = await execute("git", ["diff", filePath]);
            console.log(diff);
            await processAnswer(filePath, newCode, oldCode);
            break
        case "write":
            console.log("writing to file", filePath);
            await executeActionCmd(["writetofile", newCode, filePath, "-v"]);
            break
        case "check":
            const res = await executeTaskCmd({ name: "tsdoc-check", prompt: newCode });
            if (res.answer.text.includes("Everything is correct")) {
                await processAnswer(filePath, newCode, oldCode);
            } else {
                const secondAnswer = await select({
                    message: 'Select an action',
                    default: "fix",
                    choices: secondChoices,
                });
                let finalRes;
                switch (secondAnswer) {
                    case "fix":
                        const tres = await executeTaskCmd({ name: "tsdoc-fix", prompt: oldCode, report: newCode });
                        finalRes = tres.answer.text;
                        break;
                    case "write":
                        console.log("writing to file", filePath);
                        await executeActionCmd(["writetofile", newCode, filePath, "-v"], {});
                        return false
                    case "copy":
                        writeToClipboard(newCode);
                        return false
                    case "diff":
                        console.log("git diff", filePath);
                        const res2 = await execute("git", ["diff", filePath]);
                        console.log(res2);
                        finalRes = res2;
                        break
                    case "cancel":
                        console.log("Action canceled");
                        return false
                }
                await processAnswer(filePath, finalRes, oldCode);
            }
            break
        case "cancel":
            console.log("Action canceled");
            return false
    }
}

async function runCmd(args, options) {
    //console.log("OPTS", options);
    const isUp = await pingCmd();
    if (!isUp) {
        throw new Error("No inference server found, canceling")
    }
    if (args.length == 0) {
        throw new Error("Provide a file path");
    }
    const filePath = args[0];
    const fileData = await executeActionCmd(["read_file", filePath], options, true);
    console.log("Processing file");
    const res = await executeWorkflowCmd("tsdocfile", args, options);
    //console.log("WFR", res);
    await processAnswer(filePath, res.answer.text, fileData);
}

const cmd = {
    cmd: runCmd,
    description: "Create a git commit message from a git diff",
};

export { cmd };