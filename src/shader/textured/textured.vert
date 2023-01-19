precision mediump float;

// input
attribute vec3 aVertexCoord;
attribute vec2 aUVCoord;

// uniform
uniform mat4 projection;
uniform mat4 modelView;

// output
varying lowp vec2 uvCoord;

void main() {
    uvCoord = aUVCoord;
    gl_Position = projection * modelView * vec4(aVertexCoord, 1.0);
}
