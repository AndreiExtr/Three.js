// 1. Сцена, камера и рендерер
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.5, 100);
camera.position.z = 50;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Инициализация OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableZoom = true; // зум
controls.enablePan = true;  // панорамирование (перемещение)

// Функция для создания точек вдоль линий
function createPointsInGrid(size, spacing) {
    const points = [];
    // Располагаем точки вдоль трех осей X, Y и Z
    const numPointsPerAxis = Math.floor(size / spacing);
    
    for (let x = -size / 2; x < size / 2; x += spacing) {
        for (let y = -size / 2; y < size / 2; y += spacing) {
            for (let z = -size / 2; z < size / 2; z += spacing) {
                points.push(x, y, z); // Добавляем координаты точки
            }
        }
    }

    // Возвращаем все точки как Float32Array
    return new Float32Array(points);
}

// 2. Генерация данных для точек
const size = 30; // Размер куба
const spacing = 3; // Расстояние между точками
const positions = createPointsInGrid(size, spacing);

// 3. Буферная геометрия и материал для облака точек
const geometry = new THREE.BufferGeometry();
geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

const material = new THREE.PointsMaterial({
    size: 0.2, // Размер точки
    color: 0xffffff, // Цвет
});

// 4. Создание облака точек и добавление в сцену
const points = new THREE.Points(geometry, material);
scene.add(points);

// 5. Создаем точку для центра с красным цветом
const redPointGeometry = new THREE.BufferGeometry();
redPointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));

const redPointMaterial = new THREE.PointsMaterial({
    size: 0.5, // Размер красной точки
    color: 0xff0000, // Красный цвет
});

const redPoint = new THREE.Points(redPointGeometry, redPointMaterial);
scene.add(redPoint);

// 6. Создаем точку с оранжевым цветом
const orangePointGeometry = new THREE.BufferGeometry();
orangePointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([0, 12, 0]), 3));

const orangePointMaterial = new THREE.PointsMaterial({
    size: 0.5, // Размер оранжевой точки
    color: 0xFFA500, // Оранжевый цвет
});

const orangePoint = new THREE.Points(orangePointGeometry, orangePointMaterial);
scene.add(orangePoint);

// 7. Создаем точку на грани куба
const bluePointGeometry = new THREE.BufferGeometry();
bluePointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([12, 0, 0]), 3));

const bluePointMaterial = new THREE.PointsMaterial({
    size: 0.5, // Размер точки на грани
    color: 0x0000ff, // Синий цвет
});

const bluePoint = new THREE.Points(bluePointGeometry, bluePointMaterial);
scene.add(bluePoint);

// 7. Создаем точку на грани куба
const greenPointGeometry = new THREE.BufferGeometry();
greenPointGeometry.setAttribute('position', new THREE.BufferAttribute(new Float32Array([12, 12, 0]), 3));

const greenPointMaterial = new THREE.PointsMaterial({
    size: 0.5, // Размер точки на грани
    color: 0x00ff00, // Зелены цвет
});

const greenPoint = new THREE.Points(greenPointGeometry, greenPointMaterial);
scene.add(greenPoint);

// 8. Анимация
function animate() {
    requestAnimationFrame(animate);

    // Вращение облака точек
    points.rotation.x += 0.0001;
    points.rotation.y += 0.0001;
    redPoint.rotation.x += 0.0001;
    redPoint.rotation.y += 0.0001;
    orangePoint.rotation.x += 0.0001;
    orangePoint.rotation.y += 0.0001;
    bluePoint.rotation.x += 0.0001;
    bluePoint.rotation.y += 0.0001;
    greenPoint.rotation.x += 0.0001;
    greenPoint.rotation.y += 0.0001;

    controls.update();

    renderer.render(scene, camera);
}

// 9. Поддержка изменения размеров окна
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Запуск анимации
animate();
