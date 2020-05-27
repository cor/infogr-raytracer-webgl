precision highp float;

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

#define LIGHT_COUNT 42//$LIGHT_COUNT$//
uniform Light lights[LIGHT_COUNT];

#define CIRCLE_COUNT 42//$CIRCLE_COUNT$//
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

struct Rectangle {
    vec2 lu;
    vec2 ru;
    vec2 rl;
    vec2 ll;
};

Rectangle newRectangle(in vec2 position, float width, float height, float angle) {
    vec2 corners[4];
    corners[0] = vec2(-width * 0.5, height * 0.5); //lu
    corners[1] = vec2(width * 0.5, height * 0.5);  // ru
    corners[2] = vec2(width * 0.5, -height * 0.5); // rl
    corners[3] = vec2(-width * 0.5, -height * 0.5); // ll

    if (angle != 0.0) {
        for (int i = 0; i < 4; i++) {
            vec2 corner = corners[i];
            corners[i] = vec2(
            corner.x * cos(angle) - corner.y * sin(angle),
            corner.xy * sin(angle) + corner.y * cos(angle)
            );
        }
    }

    for (int i = 0; i < 4; i++) {
        corners[i] += position;
    }

    return Rectangle(corners[0], corners[1], corners[2], corners[3]);
}

struct RawRect {
    vec2 position;
    float width;
    float height;
    float angle;
};

#define RECTANGLE_COUNT 42//$RECTANGLE_COUNT//
uniform RawRect rectangles[RECTANGLE_COUNT];
Rectangle rects[RECTANGLE_COUNT];
bool lineIntersects(Ray ray, vec2 lineStart, vec2 lineEnd) {
    vec2 rayStart = ray.origin;
    vec2 rayEnd = ray.origin + ray.direction;

    vec2 rayStoLineS = lineStart - rayStart;
    vec2 r = ray.direction * ray.magnitude;
    vec2 s = lineEnd - lineStart;

    float crossR = (rayStoLineS.x * r.y) - (rayStoLineS.y * r.x);
    float crossS = (rayStoLineS.x * s.y) - (rayStoLineS.y * s.x);
    float rCrossS = r.x * s.y - r.y * s.x;

    if (crossR == 0.0) {
        return ((lineStart.x - rayStart.x < 0.0) != (lineStart.x - rayEnd.x < 0.0)) ||
        ((lineStart.y - rayStart.y < 0.0) != (lineStart.y - rayEnd.y < 0.0));
    }

    if (rCrossS == 0.0) return false;

    float t = crossS / rCrossS;
    float u = crossR / rCrossS;

    return (t >= 0.0) && (t <= 1.0) && (u >= 0.0) && (u <= 1.0);
}

bool rectangleIntersect(Ray ray, Rectangle rect) {
    return lineIntersects(ray, rect.ll, rect.lu) ||
    lineIntersects(ray, rect.lu, rect.ru) ||
    lineIntersects(ray, rect.ru, rect.rl) ||
    lineIntersects(ray, rect.rl, rect.ll);
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

        for (int r = 0; r < RECTANGLE_COUNT; r++) {
            Rectangle rect = rects[i];
            if (rectangleIntersect(ray, rect)) {
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
    for (int r = 0; r < RECTANGLE_COUNT; r++) {
        RawRect raw = rectangles[r];
        rects[r] = newRectangle(raw.position, raw.width, raw.height, raw.angle);
    }

    gl_FragColor = vec4(Trace(ToWorldSpace(screenPosition)), 1.0);
}
