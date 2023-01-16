export default (String.raw`
precision mediump float;

varying vec3 vertexColor;

void main() {
    gl_FragColor = vec4(vertexColor, 1.0);
}
`)
