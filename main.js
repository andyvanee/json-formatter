const urlParams = new URLSearchParams(window.location.search)
const given = urlParams.get("j")
const filename = "a.json"
const zipOptions = {
    type: "base64",
    compression: "DEFLATE",
    checkCRC32: true,
    compressionOptions: {
        level: 9
    }
}
const initialJSON = { test: true }
const container = document.getElementById("jsoneditor")
const options = { mode: "tree", modes: ["code", "tree"] }
const editor = new JSONEditor(container, options, initialJSON)
const saveFile = () => {
    const json = JSON.stringify(editor.get())
    const zip = new JSZip()
    zip.file(filename, json)
    zip.generateAsync(zipOptions).then(base64 => {
        window.location.search = `j=${encodeURIComponent(base64)}`
    })
}

if (given) {
    const base64 = decodeURIComponent(given)
    const zip = new JSZip()
    zip.loadAsync(base64, { base64: true })
        .then(zip => {
            return zip.file(filename).async("text")
        })
        .then(txt => {
            editor.set(JSON.parse(txt))
            editor.expandAll()
        })
}

window.addEventListener("keydown", evt => {
    if (evt.metaKey && evt.key == "s") {
        evt.preventDefault()
        saveFile()
    }
})
