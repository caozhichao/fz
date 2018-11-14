/// 阅读 api.d.ts 查看文档
///<reference path="api.d.ts"/>

import * as path from 'path';
import { UglifyPlugin, CompilePlugin, ManifestPlugin, ExmlPlugin, EmitResConfigFilePlugin, TextureMergerPlugin, CleanPlugin,RenamePlugin } from 'built-in';
import { WxgamePlugin } from './wxgame/wxgame';
import { CustomPlugin } from './myplugin';
import * as defaultConfig from './config';
import {VersionPlugin2} from './VersionPlugin2'

const config: ResourceManagerConfig = {

    buildConfig: (params) => {

        const { target, command, projectName, version } = params;
        const outputDir = `../${projectName}_wxgame`;
        console.log('outputDir:' + outputDir);
        if (command == 'build') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "debug", defines: { DEBUG: true, RELEASE: false } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new ManifestPlugin({ output: 'manifest.js' }),
                    new RenamePlugin({
                        verbose: true, hash: 'crc32', matchers: [
                            { from: "resource/assets/game/**/*.*", to: "[path][name]_[hash].[ext]" },                            
                            { from: "resource/default.res.json", to: "[path][name]_[hash].[ext]" },
                            { from: "resource/config/description.json", to: "[path][name]_[hash].[ext]" }
                        ]
                    }),
                    new VersionPlugin2(outputDir)
                ]
            }
        }
        else if (command == 'publish') {
            return {
                outputDir,
                commands: [
                    new CleanPlugin({ matchers: ["js", "resource"] }),
                    new CompilePlugin({ libraryType: "release", defines: { DEBUG: false, RELEASE: true } }),
                    new ExmlPlugin('commonjs'), // 非 EUI 项目关闭此设置
                    new WxgamePlugin(),
                    new UglifyPlugin([{
                        sources: ["main.js"],
                        target: "main.min.js"
                    }
                    ]),
                    new ManifestPlugin({ output: 'manifest.js' }),
                    new RenamePlugin({
                        verbose: true, hash: 'crc32', matchers: [
                            { from: "resource/assets/game/**/*.*", to: "[path][name]_[hash].[ext]" },                            
                            { from: "resource/default.res.json", to: "[path][name]_[hash].[ext]" },
                            { from: "resource/config/description.json", to: "[path][name]_[hash].[ext]" }
                        ]
                    }),
                    new VersionPlugin2(outputDir)
                ]
            }
        }
        else {
            throw `unknown command : ${params.command}`;
        }
    },

    mergeSelector: defaultConfig.mergeSelector,

    typeSelector: defaultConfig.typeSelector
}



export = config;
