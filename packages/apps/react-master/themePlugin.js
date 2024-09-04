const postcss = require('postcss')

const defaults = {
    functionName: 'lyl',
    groups: {},
    dataThemeSelector: 'html[data-theme="dark"]',
    nestingPlugin: null
}

module.exports = postcss.plugin("postcss-theme-color", options => {
    options = Object.assign({}, defaults, options)

    const reGruop = new RegExp(`\\b${options.functionName}\\(([^)]+)\\)`, "g")

    return (css, result) => {
        const hasPlugin = name => name.replace(/^postcss-/, '') === options.nestingPlugin || result.processor.plugins.some(p => p.postcssPlugin === name)

        const getValue = (value, theme) => {
            return value.replace(reGruop, (_, group) => {
                return options.groups[group][theme]
            })
        }

        css.walkDecls(decl => {
            const value = decl.value

            // 判断value有没有lyl()
            if (!value || !reGruop.test(value)) {
                return
            }

            // 对于lyl(slate50)，我们要转换成light: #f8fafc
            const lightValue = getValue(value, 'light')
            const darkValue = getValue(value, 'dark')

            const lightDecl = decl.clone({ value: lightValue })
            const darkDecl = decl.clone({ value: darkValue })

            let darkRule

            if (hasPlugin('postcss-nesting')) {
                darkRule = postcss.atRule({
                    name: 'nest',
                    params: `${options.dataThemeSelector} &`
                })
            }
            else if (hasPlugin('postcss-nested')) {
                darkRule = postcss.rule({
                    params: `${options.dataThemeSelector}`
                })
            }
            else {
                decl.warn(result, 'no plugins')
            }

            if (darkRule) {
                darkRule.append(darkDecl)
                decl.after(darkRule)
            }

            decl.replaceWith(lightDecl)
        })
    }
})