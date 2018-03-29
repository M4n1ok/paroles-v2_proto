precision mediump float;

uniform mat4 projectionMatrix;
uniform mat4 modelViewMatrix;

attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;

varying vec2 vUv;

void main() {

	vUv = uv;
	vec4 pos = modelViewMatrix * vec4( position, 1.0 );
	gl_Position = projectionMatrix * pos;
}
