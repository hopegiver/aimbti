import * as esbuild from 'esbuild';
import { existsSync, mkdirSync } from 'fs';

// Ensure dist directory exists
if (!existsSync('./dist')) {
    mkdirSync('./dist');
}

// Build ESM version (unminified)
await esbuild.build({
    entryPoints: ['src/aimbti.js'],
    bundle: true,
    format: 'esm',
    outfile: 'dist/aimbti.esm.js',
    sourcemap: true,
    target: ['es2020'],
    banner: {
        js: '// AIMBTI - AI MBTI Personality Test\n// https://github.com/hopegiver/aimbti\n',
    },
});

console.log('✓ ESM build complete: dist/aimbti.esm.js');

// Build minified IIFE version
await esbuild.build({
    entryPoints: ['src/aimbti.js'],
    bundle: true,
    format: 'iife',
    globalName: 'AIMBTI',
    outfile: 'dist/aimbti.min.js',
    minify: true,
    sourcemap: true,
    target: ['es2020'],
    banner: {
        js: '// AIMBTI - AI MBTI Personality Test - https://github.com/hopegiver/aimbti\n',
    },
});

console.log('✓ Minified IIFE build complete: dist/aimbti.min.js');

console.log('\n🎉 All builds completed successfully!\n');
console.log('Output files:');
console.log('  - dist/aimbti.esm.js (ESM format, unminified)');
console.log('  - dist/aimbti.min.js (IIFE format, minified)');
