import math from '../include/math.mjs'

export default (math + String.raw`
precision mediump float;

attribute vec3 aVertexCoord;
attribute vec3 aVertexNormal;

const vec3 diffuse = vec3(1.0);
const vec3 lightDir = vec3(0.0, 0.0, 1.0);

uniform mat4 projection;
uniform mat4 modelView;

struct Material {
    vec3 ambient;
    vec3 diffuse;
};

uniform Material material;

varying vec3 vertexColor; 

void main() {
    vec3 fragPos = vec3(modelView * vec4(aVertexCoord, 1.0));
    vec3 normal = normalize(transpose(inverse(mat3(modelView))) * aVertexNormal);

    float diff = max(dot(normal, lightDir), 0.0);
    vertexColor = material.ambient + (diffuse * material.diffuse * diff);

    gl_Position = projection * vec4(fragPos, 1.0);
}
`)
