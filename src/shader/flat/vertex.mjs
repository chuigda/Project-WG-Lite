export default (String.raw`
precision mediump float;

// input
attribute vec3 aVertexCoord;

// uniform
uniform mat4 projection;
uniform mat4 modelView;

void main() {
    gl_Position = projection * modelView * vec4(aVertexCoord, 1.0);
}
`)
