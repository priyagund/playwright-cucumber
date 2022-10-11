const options = [
    "--require-module ts-node/register",
    "--require step-defs/*.ts",
    "-f json:test-report/cucumber_report.json",
    "--retry", "2",
    "--parallel", "3"
].join(" ");

let runsettings = ["features/*.feature", options].join(" ");

module.exports = {
    runner: runsettings,
};