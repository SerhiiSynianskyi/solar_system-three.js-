window.onload = function() {
    let scene, camera, renderer, container,
        w, h;
    w = parseInt(document.body.clientWidth);
    h = parseInt(document.body.clientHeight);

    container = document.createElement('div');
    document.body.appendChild(container);
    ////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 130000);
    camera.position.set(0, 3000, 50000);
    camera.rotation.z = Math.PI;
    scene = new THREE.Scene();

    ////////////////////////////////////////////////////////////////

    let light = new THREE.AmbientLight(0x111111), // soft white light
        pointLight = new THREE.PointLight(0xffffff, 1.7, 100000);
    pointLight.position.set(0, 1000, 8000);
    pointLight.castShadow = true;
    pointLight.ShadowMapWidth = 2048;
    pointLight.ShadowMapHeight = 2048;
    scene.add(light);
    scene.add(pointLight);

       pointLight1 = new THREE.PointLight(0xffffff, 1.7, 100000);
    pointLight1.position.set(0, -1000, -8000);
    pointLight1.castShadow = true;
    pointLight1.ShadowMapWidth = 2048;
    pointLight1.ShadowMapHeight = 2048;
    scene.add(pointLight1);

    //////////////////////////////////////////////////////////////// - start
    let stars1,
        stars2,
        starsGeom = new THREE.Geometry(),
        starsMat1 = new THREE.ParticleBasicMaterial({ color: 0xaaaaaa, opacity: 0.1, size: 1, sizeAttenuation: false });
    starsMat2 = new THREE.ParticleBasicMaterial({ color: 0xbbbbbb, opacity: 1, size: 1, sizeAttenuation: false });

    while (starsGeom.vertices.length < 5000) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(14000);
        starsGeom.vertices.push(vertex);
    }

    stars1 = new THREE.ParticleSystem(starsGeom, starsMat1);
    stars2 = new THREE.ParticleSystem(starsGeom, starsMat2);
    stars1.scale.set(3, 3, 3);
    stars2.scale.set(3, 3, 3);
    scene.add(stars1);
    scene.add(stars2);

    // SUN
    let sun, sunGeom, sunMat, sunTexture, sunloader;
    sumGeom = new THREE.SphereGeometry(2000, 30, 30);

    sunTexture = new THREE.Texture();
    sunloader = new THREE.ImageLoader();
    sunloader.load("textures/sun.jpg", function(e) {
        sunTexture.image = e; // событие загрузки
        sunTexture.needsUpdate = true;
    });
    sunTexture.anisatropy = 0;
    sunMat = new THREE.MeshPhongMaterial({ map: sunTexture, overdraw: true });
    sun = new THREE.Mesh(sumGeom, sunMat);
    // sun.castShadow = true; //default is false
    scene.add(sun);

    // MERCURY
    let mercury, merGeom, merMat, merTexture, merloader;
    merGeom = new THREE.SphereGeometry(60, 20, 20);

    merTexture = new THREE.Texture();
    merloader = new THREE.ImageLoader();
    merloader.load("textures/mercury.jpg", function(e) {
        merTexture.image = e; // событие загрузки
        merTexture.needsUpdate = true;
    });
    merTexture.anisatropy = 0;
    merMat = new THREE.MeshPhongMaterial({ map: merTexture, emissive: 0x000000, overdraw: true });
    mercury = new THREE.Mesh(merGeom, merMat);
    mercury.castShadow = true;
    scene.add(mercury);

    // VENUS
    let venus, venusGeom, venusMat, venusTexture, venusloader;
    venusGeom = new THREE.SphereGeometry(60, 20, 20);

    venusTexture = new THREE.Texture();
    venusloader = new THREE.ImageLoader();
    venusloader.load("textures/venus.jpg", function(e) {
        venusTexture.image = e; // событие загрузки
        venusTexture.needsUpdate = true;
    });
    venusTexture.anisatropy = 0;
    venusMat = new THREE.MeshPhongMaterial({ map: venusTexture, emissive: 0x000000, overdraw: true });
    venus = new THREE.Mesh(venusGeom, venusMat);
    venus.castShadow = true;
    scene.add(venus);

    // EARTH
    let earth, earthGeom, earthMat;
    earthGeom = new THREE.SphereGeometry(100, 40, 40);
    earthTexture = new THREE.Texture();
    earthloader = new THREE.ImageLoader();
    earthloader.load("textures/earth.jpg", function(e) {
        earthTexture.image = e; // событие загрузки
        earthTexture.needsUpdate = true;
    });
    earthTexture.anisatropy = 0;
    earthMat = new THREE.MeshPhongMaterial({ map: earthTexture, overdraw: true, emissive: 0x000000 });
    earth = new THREE.Mesh(earthGeom, earthMat);
    earth.castShadow = true;
    scene.add(earth);

    // MARS
    let mars, marsGeom, marsMat;
    marsGeom = new THREE.SphereGeometry(80, 20, 20);
    marsTexture = new THREE.Texture();
    marsloader = new THREE.ImageLoader();
    marsloader.load("textures/mars.jpg", function(e) {
        marsTexture.image = e; // событие загрузки
        marsTexture.needsUpdate = true;
    });
    marsTexture.anisatropy = 10;
    marsMat = new THREE.MeshPhongMaterial({ map: marsTexture, overdraw: true, emissive: 0x000000 });
    mars = new THREE.Mesh(marsGeom, marsMat);
    mars.castShadow = true;
    scene.add(mars);

    // JUPITER
    let jupiter, jupiterGeom, jupiterMat;
    jupiterGeom = new THREE.SphereGeometry(350, 50, 50);
    jupiterTexture = new THREE.Texture();
    jupiterloader = new THREE.ImageLoader();
    jupiterloader.load("textures/jupiter.jpg", function(e) {
        jupiterTexture.image = e; // событие загрузки
        jupiterTexture.needsUpdate = true;
    });
    jupiterTexture.anisatropy = 0;
    jupiterMat = new THREE.MeshPhongMaterial({ map: jupiterTexture, overdraw: true });
    jupiter = new THREE.Mesh(jupiterGeom, jupiterMat);
    jupiter.castShadow = true;
    scene.add(jupiter);


    // SATURN
    let saturn, saturnGeom, saturnMat;
    saturnGeom = new THREE.SphereGeometry(230, 50, 50);
    saturnTexture = new THREE.Texture();
    saturnloader = new THREE.ImageLoader();
    saturnloader.load("textures/saturn.jpg", function(e) {
        saturnTexture.image = e; // событие загрузки
        saturnTexture.needsUpdate = true;
    });
    saturnTexture.anisatropy = 0;
    saturnMat = new THREE.MeshPhongMaterial({ map: saturnTexture, overdraw: true });
    saturn = new THREE.Mesh(saturnGeom, saturnMat);
    saturn.castShadow = true;
    scene.add(saturn);

    let saturnRingGeom = new THREE.Geometry(),
        saturnRingMat = new THREE.ParticleBasicMaterial({color: 0x3a3a3a, opacity: 0.6, size: 1, sizeAttenuation: false});

    for(let i=0; i<20000; i++){
        let vertex = new THREE.Vector3();
        vertex.x = Math.sin(Math.PI/180*i)*(550-i/100);
        vertex.y = Math.random()*20;
        vertex.z = Math.cos(Math.PI/180*i)*(550-i/100);
        saturnRingGeom.vertices.push(vertex);
    }

    let ring = new THREE.ParticleSystem(saturnRingGeom, saturnRingMat);
    ring.castShadow = true;
    ring.receiveShadow = true;
    scene.add(ring);

    // URANUS
    let uranus, uranusGeom, uranusMat;
    uranusGeom = new THREE.SphereGeometry(120, 20, 20);
    uranusTexture = new THREE.Texture();
    uranusloader = new THREE.ImageLoader();
    uranusloader.load("textures/uranus.jpg", function(e) {
        uranusTexture.image = e; // событие загрузки
        uranusTexture.needsUpdate = true;
    });
    uranusTexture.anisatropy = 0;
    uranusMat = new THREE.MeshPhongMaterial({ map: uranusTexture, overdraw: true, emissive: 0x000000 });
    uranus = new THREE.Mesh(uranusGeom, uranusMat);
    uranus.castShadow = true;
    scene.add(uranus);

    // URANUS
    let neptune, neptuneGeom, neptuneMat;
    neptuneGeom = new THREE.SphereGeometry(110, 20, 20);
    neptuneTexture = new THREE.Texture();
    neptuneloader = new THREE.ImageLoader();
    neptuneloader.load("textures/neptune.jpg", function(e) {
        neptuneTexture.image = e; // событие загрузки
        neptuneTexture.needsUpdate = true;
    });
    neptuneTexture.anisatropy = 0;
    neptuneMat = new THREE.MeshPhongMaterial({ map: neptuneTexture, overdraw: true, emissive: 0x000000 });
    neptune = new THREE.Mesh(neptuneGeom, neptuneMat);
    neptune.castShadow = true;
    scene.add(neptune);


    //////////////////////////////////////////////////////////////////
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setSize(w, h);
    renderer.shadowMap.enabled = true; //.shadowMapEnabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    // renderer.shadowMap.type    = THREE.PCFShadowMap
    // renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    //////////////////////////////////////////////////////

    let controls = new THREE.TrackballControls(camera);


    let t = 0;

    function rendering() {
        requestAnimationFrame(rendering);
        controls.update();

        sun.rotation.y += 0.003;

        mercury.position.x = Math.sin(t * 0.15) * 9000;
        mercury.position.z = Math.cos(t * 0.15) * 9000;

        venus.position.x = Math.sin(t * 0.1) * 12000;
        venus.position.z = Math.cos(t * 0.1) * 12000;

        earth.position.x = Math.sin(t * 0.05) * 18000;
        earth.position.z = Math.cos(t * 0.05) * 18000;

        mars.position.x = Math.sin(t * 0.04) * 36000;
        mars.position.z = Math.cos(t * 0.04) * 36000;

        jupiter.position.x = Math.sin(t * 0.025) * 50700;
        jupiter.position.z = Math.cos(t * 0.025) * 50700;

        saturn.position.x = Math.sin(t * 0.035) * 60000;
        saturn.position.z = Math.cos(t * 0.035) * 60000;
        ring.position.x = saturn.position.x;
        ring.position.z = saturn.position.z;
        ring.rotation.x = 700;

        uranus.position.x = Math.sin(t * 0.05) * 70000;
        uranus.position.z = Math.cos(t * 0.05) * 70000;

        neptune.position.x = Math.sin(t * 0.6) * 80500;
        neptune.position.z = Math.cos(t * 0.6) * 80500;

        ///////////////////////////////////////////////////////////////////////

        mercury.rotation.y += 0.005;
        venus.rotation.y += 0.005;
        earth.rotation.y += 0.005;
        mars.rotation.y += 0.005;
        jupiter.rotation.y += 0.005;
        saturn.rotation.y += 0.005;
        ring.rotation.y -= 0.003;
        uranus.rotation.y += 0.005;
        neptune.rotation.y += 0.005;


        // camera.position.x = earth.position.x - 700;
        // camera.position.y = earth.position.y - 300;
        // camera.position.z = earth.position.z - 1000;
        // camera.lookAt(earth.position);


        // camera.position.x = saturn.position.x - 700;
        // camera.position.y = saturn.position.y - 300;
        // camera.position.z = saturn.position.z - 1000;
        // camera.lookAt(saturn.position);

        // t += Math.PI / 180 * 2;


        renderer.render(scene, camera);

    };
    // let helper = new THREE.CameraHelper(pointLight.shadow.camera);
    // scene.add(helper);
    // let sphereSize = 1;
    // let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    // scene.add(pointLightHelper);
    rendering();
}