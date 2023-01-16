export default (String.raw`
precision mediump float;

// input
varying lowp vec3 vertexColor;

void main() {
    gl_FragColor = vec4(vertexColor, 1.0);
}
`)
