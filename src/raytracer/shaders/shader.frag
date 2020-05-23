precision mediump float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

struct Camera
{
    vec2 position;
    float zoom;
} camera = Camera (vec2(0.0, 0.0), 1.0);

struct Light
{
    vec2 position;
    vec3 color;
};

Light light = Light(vec2(0.0, 0.0), vec3(0.0, 0.75, 0.75));

vec2 ToWorldSpace(vec2 screenSpacePoint)
{
    return (screenSpacePoint + camera.position) / camera.zoom;
}

vec3 Trace(vec2 worldPoint)
{
    vec3 colorAtPixel = vec3(0.0, 0.0, 0.0);

    vec2 vectorToLight = light.position - worldPoint;

    float distanceToLight = length(vectorToLight);
    float intensity = 1.0 / (4.0 * M_PI * distanceToLight);

    colorAtPixel += light.color * intensity;

    return colorAtPixel;
}


void main() {

    gl_FragColor = vec4(Trace(ToWorldSpace(screenPosition)), 1.0);

}
