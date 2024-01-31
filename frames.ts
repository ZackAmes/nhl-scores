export interface IFrameProps {
    frame?: string;
    data: any;
    buttons?: string[];
    postUrl?: string;
}

function generateFarcasterFrameMetaTag({ frame, data, postUrl, buttons }: IFrameProps): string {
    // Default to vNext
    if (!frame) {
        frame = "vNext"
    }
    // Ensure there are at most four buttons
    if (buttons && buttons.length > 4) {
        throw new Error("Maximum of four buttons are allowed per frame.");
    }

    let imageUrl = get_canvas(data);
  
    // Generate Open Graph tags for image, redirect, and buttons
    let metaTag = `<meta property="fc:frame" content="${frame ? frame : "vNext"}" />\n`;
    metaTag += `<meta property="fc:frame:image" content="${imageUrl}" />\n`;
  
    if (buttons) {
        buttons.forEach((button, index) => {
            metaTag += `<meta property="fc:frame:button:${index + 1}" content="${button}" />\n`;
        });
    }
  
    // post URL if exists
    if (postUrl) {
        metaTag += `<meta property="fc:frame:post_url" content="${postUrl}" /> \n`
    }
  
    return metaTag;
}

const get_canvas = (data: any) => {

    var width   = 640
    var height  = 360
    var gl = require('gl')(width, height, { preserveDrawingBuffer: true })

    //Clear screen to red
    gl.clearColor(1, 0, 0, 1)
    gl.clear(gl.COLOR_BUFFER_BIT)

    return gl.dataURL();

}
  
export function frameGenerator(frameProps: IFrameProps): string {

    const metaTag = generateFarcasterFrameMetaTag(frameProps);


    const html = `<!DOCTYPE html>
        <html>
            <head>
                <meta charset="utf-8">
                <title>NHL Scores</title>
                <meta property="og:title" content="NHLScores" />
                <meta property="og:image" content="https://example.com/img.png" />
                ${metaTag}
            </head>
        </html>
    `;
    return html;
}
