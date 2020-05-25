precision highp float;

attribute vec4 aVertexPosition;

uniform mat4 uModelViewMatrix;
uniform mat4 uProjectionMatrix;

varying mediump vec2 screenPosition;

void main() {
    screenPosition = aVertexPosition.xy;
    gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
}
