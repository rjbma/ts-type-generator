import dts, { parseFileContent, parseSchema } from "dtsgenerator";
import fs, { writeFileSync } from "fs";
import parseArgs from "minimist";
import prettier, { BuiltInParserName } from "prettier";
import $RefParser from "@apidevtools/json-schema-ref-parser";
import util, { promisify } from "util";
import Glob from "glob";
import { exit } from "process";

const glob = promisify(Glob.glob);

/**
 * Generate typescript types for the given OpenAPI spec.
 */
const generateSpecTypes = (params: {
  specFilename: string;
  outputFilename?: string;
  dereferenceJsonSchemaPointers: boolean;
  apiRootName?: string;
  componentsRootName?: string;
  placeholderType: string;
}) =>
  loadSpecFromFile(params.specFilename, params.dereferenceJsonSchemaPointers)
    .then(adaptContentMediaTypes)
    .then((spec) => parseFileContent(spec))
    .then((spec) => {
      const plugins: any = {
        "@dtsgenerator/replace-namespace": {
          map: [
            {
              from: ["Components"],
              to: [params.componentsRootName || "Components"],
            },
            {
              from: ["Paths"],
              to: [params.apiRootName || "Paths"],
            },
          ],
        },
        "dtsgenerator-express-route-types": {
          placeholderType: params.placeholderType,
        },
      };
      return dts({
        contents: [parseSchema(spec)],
        config: { plugins },
      });
    })
    .then(prettify("typescript"))
    .then(saveToFile(params.outputFilename))
    .then((types) => {
      console.log("Generated OpenApi typescript types");
      return types;
    });

/**
 * Replace media types that `dtsgenerator` doesn't support.
 */
const adaptContentMediaTypes = (spec: string): Promise<string> =>
  Promise.resolve(
    [
      {
        source: /application\/json; charset=utf-8/g,
        target: "application/custom1+json",
      },
      {
        source: /\*\/\*/g,
        target: "application/custom2+json",
      },
      {
        source: /application\/x-pem-file/g,
        target: "text/plain",
      },
    ].reduce((acc, replacer) => {
      console.log(
        `Replacing "${replacer.source}" with "${replacer.target}"...`
      );
      return acc.replace(replacer.source, replacer.target);
    }, spec)
  );

const loadSpecFromFile = (
  specFileName: string,
  dereferenceJsonSchemaPointer: boolean
) =>
  dereferenceJsonSchemaPointer
    ? $RefParser
        .dereference(specFileName, { continueOnError: false })
        .then(JSON.stringify)
    : util.promisify(fs.readFile)(specFileName, { encoding: "utf8" });

/**
 * Format the given data using `prettier`
 * @param format
 */
const prettify = (format: BuiltInParserName) => (data: string) =>
  prettier.format(data, { parser: format });

/**
 * Save the given data to a file, returning the data back.
 * @param filename
 */
const saveToFile = (filename: string | undefined) => (data: string) => {
  if (filename) {
    writeFileSync(filename, data);
  }
  return data;
};

const SOURCE_ARG = "source";
const PLACEHOLDER_TYPE_ARG = "placeholder-type";
const API_ROOT_NAME_ARG = "paths";
const COMPS_ROOT_NAME = "components";
const DEST_ARG = "dest";
const DEREF_ARG = "deref";
const args = parseArgs(process.argv, {
  string: [
    SOURCE_ARG,
    DEST_ARG,
    API_ROOT_NAME_ARG,
    COMPS_ROOT_NAME,
    PLACEHOLDER_TYPE_ARG,
  ],
  boolean: [DEREF_ARG],
});

const source: string = args[SOURCE_ARG];
if (!source) {
  console.error("--source is required. Examples:");
  console.error(`
    generate-types --source=api-spec.json --placeholder-type=unknown --paths=Paths --components=Components
    generate-types --source=api-spec-1.json,api-spec-2.json --paths=Api1,Api2
    generate-types --source=api-*.json --placeholder-type=unknown
    `);
  process.exit(-1);
}
const placeholderType: string = args[PLACEHOLDER_TYPE_ARG] || "any";
const apiRootNames = args[API_ROOT_NAME_ARG];
const componentsRootNames = args[COMPS_ROOT_NAME];

// make sure we don't rename TS Paths or Components when using glob patterns
const isGlobPattern = source.search(/\*|\?/gm) != -1;
if (isGlobPattern && (apiRootNames || componentsRootNames)) {
  throw new Error(
    "Cannot specify --paths or --components when using glob patterns"
  );
}

const globs = source.split(/,|;/).map((s) => glob(s, { nonull: true }));
Promise.all(globs)
  .then((filenames) => Array.from(new Set(filenames.flat())))
  .then((uniqueFilenames) => {
    const notFound = uniqueFilenames.filter(
      (filename) => !fs.existsSync(filename)
    );
    if (notFound.length) {
      console.error("Source file(s) not found: ", notFound);
      exit(-1);
    }
    return uniqueFilenames;
  })
  .then((filenames) =>
    filenames.reduce((acc, source, idx) => {
      return acc.then(() => {
        let dest: string = args[DEST_ARG];
        if (!dest) {
          dest = source + ".d.ts";
        }
        console.log(`Generating types for ${source} -> ${dest}...`);
        return generateSpecTypes({
          specFilename: source,
          outputFilename: dest,
          dereferenceJsonSchemaPointers: args[DEREF_ARG],
          apiRootName: atPosition(apiRootNames, idx),
          componentsRootName: atPosition(componentsRootNames, idx),
          placeholderType,
        });
      });
    }, Promise.resolve(""))
  );

const atPosition = (str: string | undefined, pos: number) =>
  str ? str.split(/,|;/)[pos] : undefined;
