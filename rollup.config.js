import { terser } from "rollup-plugin-terser"
import resolve from "rollup-plugin-node-resolve"

export default {
    plugins: [
        resolve({}),
        terser({
            keep_classnames: true,
            module: true,
            output: {
                comments: function(node, comment) {
                    var text = comment.value
                    var type = comment.type
                    if (type == "comment2") {
                        return /@preserve|@license|@cc_on/i.test(text)
                    }
                }
            }
        })
    ],
    output: {
        format: "esm"
    },
    context: "window"
}
