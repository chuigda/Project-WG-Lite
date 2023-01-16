export default String.raw`
precision mediump float;

varying vec3 fragPos;
varying vec3 vertexNormal;

const vec3 ambient = vec3(0.2);
const vec3 diffuse = vec3(0.7);
const vec3 lightDir = normalize(vec3(0.0, 0.0, 1.0));

void main() {
    vec3 normal = normalize(vertexNormal);
    
    float diff = max(dot(normal, lightDir), 0.0);
    vec3 result = ambient + (diffuse * diff);
    gl_FragColor = vec4(result, 1.0);
}
`;
