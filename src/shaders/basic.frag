precision mediump float;

uniform vec3 color;
uniform float offset;

varying vec2 vUv;

uniform sampler2D background;
uniform sampler2D foreground;

void main() {
  vec3 color;
  vec4 foregroundText = texture2D( foreground, vec2( (vUv.x * 0.98 + 0.01) + offset, vUv.y));
  if(foregroundText.w < 0.4){
    color = texture2D( background, vec2(vUv.x, vUv.y)).rgb;
  }else{
    color = foregroundText.rgb;
  }

  gl_FragColor = vec4(color, 1.);
}
