/* jshint esversion: 6 */

import babel from "rollup-plugin-babel";
import { uglify } from "rollup-plugin-uglify";

const srcFile = "src/index.js";
const distFile = "dist/crudjs.js";
const distCrossFile = "dist/crudjs.cross.js";
const distMinFile = "dist/crudjs.min.js";

const config = [
	{
		input: srcFile,
		output: [
			{
				file: distFile,
				format: 'esm',
			},
		],
	},
	{
		input: distFile,
		output: [
			{
				file: distCrossFile,
				format: 'esm',
			},
		],
		plugins: [babel()],
	},
	{
		input: distCrossFile,
		output: [
			{
				file: distMinFile,
				format: 'esm',
			},
		],
		plugins: [uglify()],
	}
];


export default config;
