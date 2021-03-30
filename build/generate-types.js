"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importStar(require("fs"));
const minimist_1 = __importDefault(require("minimist"));
const prettier_1 = __importDefault(require("prettier"));
const util_1 = __importDefault(require("util"));
const dtsgenerator_1 = __importStar(require("dtsgenerator"));
// /**
//  * Generate typescript types for the given OpenAPI spec.
//  */
// const generateSpecTypes = (params: {
//   specFilename: string;
//   outputFilename?: string;
// }) =>
//   adaptContentMediaTypes(params.specFilename)
//     .then(
//       (tmpSpecFile) =>
//         new Promise<string>((resolve, reject) => {
//           exec(
//             `npx dtsgen -c dtsgen.json ${tmpSpecFile}`,
//             (err, stdout, stderr) => {
//               fs.unlinkSync(tmpSpecFile);
//               if (err || stderr) {
//                 reject(err || stderr);
//               } else {
//                 resolve(stdout);
//               }
//             }
//           );
//         })
//     )
//     .then(prettify("typescript"))
//     .then(saveToFile(params.outputFilename))
//     .then((types) => {
//       console.log("Generated OpenApi typescript types");
//       return types;
//     });
/**
 * Generate typescript types for the given OpenAPI spec.
 */
const generateSpecTypes = (params) => adaptContentMediaTypes(params.specFilename)
    .then((spec) => dtsgenerator_1.parseFileContent(spec))
    .then((spec) => dtsgenerator_1.default({
    contents: [dtsgenerator_1.parseSchema(spec)],
    // @ts-ignore
    config: {
        plugins: {
            "dtsgenerator-express-route-types": true,
        },
    },
}))
    // .then(
    //   (tmpSpecFile) =>
    //     new Promise<string>((resolve, reject) => {
    //       exec(
    //         `npx dtsgen -c dtsgen.json ${tmpSpecFile}`,
    //         (err, stdout, stderr) => {
    //           fs.unlinkSync(tmpSpecFile);
    //           if (err || stderr) {
    //             reject(err || stderr);
    //           } else {
    //             resolve(stdout);
    //           }
    //         }
    //       );
    //     })
    // )
    .then(prettify("typescript"))
    .then(saveToFile(params.outputFilename))
    .then((types) => {
    console.log("Generated OpenApi typescript types");
    return types;
});
/**
 * Replace media types that `dtsgenerator`doesn't support.
 * See: https://github.com/obconnect-io/obconnect-codegen/issues/1
 */
const adaptContentMediaTypes = (specFilename) => util_1.default
    .promisify(fs_1.default.readFile)(specFilename, { encoding: "utf8" })
    .then((spec) => {
    console.log('Replacing "application/json; charset=utf-8" with "application/custom1+json"...');
    return spec.replace(/"application\/json; charset=utf-8"/g, "application/custom1+json");
})
    .then((spec) => {
    console.log('Replacing "*/*" with "application/custom2+json"...');
    return spec.replace(/\*\/\*/g, "application/custom2+json");
});
// .then(spec => spec.replace(/"application\/json; charset=utf-8"/g, 'application/text+json'))
// .then((spec) => tempy.write(spec, { extension: "json" }));
/**
 * Format the given data using `prettier`
 * @param format
 */
const prettify = (format) => (data) => prettier_1.default.format(data, { parser: format });
/**
 * Save the given data to a file, returning the data back.
 * @param filename
 */
const saveToFile = (filename) => (data) => {
    if (filename) {
        fs_1.writeFileSync(filename, data);
    }
    return data;
};
const SOURCE_ARG = "source";
const DEST_ARG = "dest";
const args = minimist_1.default(process.argv, { string: [SOURCE_ARG, DEST_ARG] });
const source = args.source;
if (!source) {
    throw new Error("--source is required");
}
source.split(/,|;/).reduce((acc, source) => {
    return acc.then(() => {
        let dest = args.dest;
        if (!dest) {
            dest = source + ".d.ts";
        }
        console.log(`Generating types for ${source} -> ${dest}...`);
        return generateSpecTypes({ specFilename: source, outputFilename: dest });
    });
}, Promise.resolve(""));
//# sourceMappingURL=generate-types.js.map