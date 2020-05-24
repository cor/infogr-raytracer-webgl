precision mediump float;

#define M_PI 3.1415926535897932384626433832795

varying mediump vec2 screenPosition;

struct Camera
{
    vec2 position;
    float zoom;
} camera = Camera (vec2(0.0, 0.0), 0.5);

struct Ray
{
    vec2 origin;
    vec2 direction;
    float magnitude;
};

struct Light
{
    vec2 position;
    vec3 color;
};

struct Circle
{
    vec2 position;
    float radius;
};

#define LIGHT_COUNT 3
uniform Light lights[LIGHT_COUNT];

#define CIRCLE_COUNT 2
uniform Circle circles[CIRCLE_COUNT];


// INTERSECTION CHECKS
bool circleIntersects(Circle circle, Ray ray)
{
    vec2 posToOrigin = ray.origin - circle.position;
    float a = dot(ray.direction, ray.direction);
    float b = dot(ray.direction, posToOrigin);
    float c = dot(posToOrigin, posToOrigin) - (circle.radius * circle.radius);
    float d = (b * b) - (a * c);

    if (d < 0.0) return false;

    float sqrtD = sqrt(d);
    float distance = (-b - sqrtD) / a;
    if (distance < 0.0) distance = (-b + sqrtD) / a;

    return distance > 0.0 && distance < ray.magnitude;
}




vec2 ToWorldSpace(vec2 screenSpacePoint)
{
    return (screenSpacePoint + camera.position) / camera.zoom;
}

vec3 Trace(vec2 worldPoint)
{
    vec3 colorAtPixel = vec3(0.0, 0.0, 0.0);

    for (int i = 0; i < LIGHT_COUNT; i++) {

        vec2 vectorToLight = lights[i].position - worldPoint;

        // Don't forget to normalize the ray's direction
        Ray ray = Ray(worldPoint, vectorToLight, length(vectorToLight));
        ray.direction = normalize(ray.direction);

        // Check for occlusions between ray
        bool occluded = false;
        for (int c = 0; c < CIRCLE_COUNT; c++) {
            Circle circle = circles[c];
            if (circleIntersects(circle, ray)) {
                occluded = true;
                break;
            }
        }
        if (occluded) continue;


        float distanceToLight = length(vectorToLight);
        float intensity = 1.0 / (4.0 * M_PI * distanceToLight);

        colorAtPixel += lights[i].color * intensity;
    }


    return colorAtPixel;
}


void main() {

    gl_FragColor = vec4(Trace(ToWorldSpace(screenPosition)), 1.0);

}
