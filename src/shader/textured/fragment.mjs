export default (String.raw`
precision mediump float;

// input
varying lowp vec2 uvCoord;

// uniform
uniform sampler2D tex;

void main() {
    gl_FragColor = texture2D(tex, uvCoord);
}
`)
