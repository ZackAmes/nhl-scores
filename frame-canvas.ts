import { WebGLRenderer } from "three"
const get_canvas = (data: any) => {

    var width   = 640
    var height  = 360
    var gl = require('gl')(width, height, { preserveDrawingBuffer: true })

    //Clear screen to red
    gl.clearColor(1, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    return gl.dataURL();

}

export default get_canvas;

