precision mediump float;

// input
attribute vec3 aVertexCoord;
attribute vec3 aVertexNormal;

// uniform
const vec3 diffuse = vec3(1.0);
const vec3 lightDir = vec3(0.0, 0.0, 1.0);

uniform mat4 projection;
uniform mat4 modelView;

struct Material {
    vec3 ambient;
    vec3 diffuse;
};

uniform Material material;

// output
varying lowp vec3 vertexColor; 

// functions
mat3 transpose(mat3 inMatrix) {
    vec3 i0 = inMatrix[0];
    vec3 i1 = inMatrix[1];
    vec3 i2 = inMatrix[2];

    mat3 outMatrix = mat3(
    vec3(i0.x, i1.x, i2.x),
    vec3(i0.y, i1.y, i2.y),
    vec3(i0.z, i1.z, i2.z)
    );

    return outMatrix;
}

float det(mat2 matrix) {
    return matrix[0].x * matrix[1].y - matrix[0].y * matrix[1].x;
}

mat3 inverse(mat3 matrix) {
    vec3 row0 = matrix[0];
    vec3 row1 = matrix[1];
    vec3 row2 = matrix[2];

    vec3 minors0 = vec3(
    det(mat2(row1.y, row1.z, row2.y, row2.z)),
    det(mat2(row1.z, row1.x, row2.z, row2.x)),
    det(mat2(row1.x, row1.y, row2.x, row2.y))
    );
    vec3 minors1 = vec3(
    det(mat2(row2.y, row2.z, row0.y, row0.z)),
    det(mat2(row2.z, row2.x, row0.z, row0.x)),
    det(mat2(row2.x, row2.y, row0.x, row0.y))
    );
    vec3 minors2 = vec3(
    det(mat2(row0.y, row0.z, row1.y, row1.z)),
    det(mat2(row0.z, row0.x, row1.z, row1.x)),
    det(mat2(row0.x, row0.y, row1.x, row1.y))
    );

    mat3 adj = transpose(mat3(minors0, minors1, minors2));

    return (1.0 / dot(row0, minors0)) * adj;
}

void main() {
    vec3 fragPos = vec3(modelView * vec4(aVertexCoord, 1.0));
    vec3 normal = normalize(transpose(inverse(mat3(modelView))) * aVertexNormal);

    float diff = max(dot(normal, lightDir), 0.0);
    vertexColor = material.ambient + (diffuse * material.diffuse * diff);

    gl_Position = projection * vec4(fragPos, 1.0);
}