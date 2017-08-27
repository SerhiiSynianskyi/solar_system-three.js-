window.onload = function() {
    console.time('T1');
    let scene, camera, renderer, container,
        w, h;
    w = parseInt(document.body.clientWidth);
    h = parseInt(document.body.clientHeight);

    container = document.createElement('div');
    document.body.appendChild(container);
    ////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 200000);
    camera.position.set(0, 3000, 50000);
    camera.rotation.z = Math.PI;
    scene = new THREE.Scene();

    ////////////////////////////////////////////////////////////////

    let light = new THREE.AmbientLight(0x111111), // soft white light // TODO - refactor
        pointLightArray = [{
                'x': 0,
                'y': 0,
                'z': 7000
            },
            {
                'x': 0,
                'y': 0,
                'z': -7000
            },
            {
                'x': 7000,
                'y': 0,
                'z': 0
            },
            {
                'x': -7000,
                'y': 0,
                'z': 0
            },
            {
                'x': 0,
                'y': 7000,
                'z': 0
            },
            {
                'x': 0,
                'y': -7000,
                'z': 0
            }
        ];
    pointLightArray.forEach(function(item) {
        let pointLight = new THREE.PointLight(0xffffff, 0.6, 80000);
        pointLight.position.set(item.x, item.y, item.z);
        pointLight.castShadow = true;
        pointLight.ShadowMapWidth = 1024;
        pointLight.ShadowMapHeight = 1024;
        scene.add(light);
        scene.add(pointLight);
    });

    //////////////////////////////////////////////////////////////// - start
    let stars1, stars2,
        starsGeom = new THREE.Geometry(),
        starsMat1 = new THREE.ParticleBasicMaterial({ color: 0xaaaaaa, opacity: 0.1, size: 1, sizeAttenuation: false }),
        starsMat2 = new THREE.ParticleBasicMaterial({ color: 0xffffff, opacity: 0.1, size: 1, sizeAttenuation: false });
    while (starsGeom.vertices.length < 2000) {
        let vertex = new THREE.Vector3();
        vertex.x = Math.random() * 2 - 1;
        vertex.y = Math.random() * 2 - 1;
        vertex.z = Math.random() * 2 - 1;
        vertex.multiplyScalar(20000);
        starsGeom.vertices.push(vertex);
    }

    stars1 = new THREE.ParticleSystem(starsGeom, starsMat1);
    stars2 = new THREE.ParticleSystem(starsGeom, starsMat2);
    stars1.scale.set(3, 3, 3);
    stars2.scale.set(3, 3, 3);
    scene.add(stars1);
    scene.add(stars2);

    /////////////////////////////////////////////////// Space objects

    let SpaceObject = function(texture, raduis, rendering) {
        this.texture = texture,
            this.raduis = raduis,
            this.rendering = rendering,
            this.init = function() {
                let spaceObject, spaceObjectGeom, spaceObjectMat, spaceObjectTexture, spaceObjectloader;
                spaceObjectGeom = new THREE.SphereGeometry(this.raduis, this.rendering, this.rendering);
                spaceObjectTexture = new THREE.Texture();
                spaceObjectloader = new THREE.ImageLoader();
                spaceObjectloader.load(this.texture, function(e) {
                    spaceObjectTexture.image = e; // событие загрузки
                    spaceObjectTexture.needsUpdate = true;
                });
                spaceObjectTexture.anisatropy = 0;
                spaceObjectMat = new THREE.MeshPhongMaterial({ map: spaceObjectTexture, overdraw: true });
                spaceObject = new THREE.Mesh(spaceObjectGeom, spaceObjectMat);
                spaceObject.castShadow = true;
                return spaceObject;
            }
    }
    let sun, mercury,venus,earth,mars,jupiter,saturn,ring,uranus,neptune;
    function planetRendering() {

        sun = new SpaceObject("textures/sun.jpg", 2000, 30).init();
        scene.add(sun);

        mercury = new SpaceObject("textures/mercury.jpg", 60, 20).init();
        scene.add(mercury);

        venus = new SpaceObject("textures/venus.jpg", 60, 20).init();
        scene.add(venus);

        earth = new SpaceObject("textures/earth.jpg", 100, 40).init();
        scene.add(earth);

        mars = new SpaceObject("textures/mars.jpg", 80, 20).init();
        scene.add(mars);

        jupiter = new SpaceObject("textures/jupiter.jpg", 350, 50).init();
        scene.add(jupiter);

        saturn = new SpaceObject("textures/saturn.jpg", 230, 50).init();
        scene.add(saturn);

        let saturnRingGeom = new THREE.Geometry(),
            saturnRingMat = new THREE.ParticleBasicMaterial({ color: 0x3a3a3a, opacity: 0.6, size: 1, sizeAttenuation: false });

        for (let i = 0; i < 20000; i++) {
            let vertex = new THREE.Vector3();
            vertex.x = Math.sin(180 / Math.PI * i) * (550 - i / 100);
            vertex.y = Math.random() * 20;
            vertex.z = Math.cos(180 / Math.PI * i) * (550 - i / 100);
            saturnRingGeom.vertices.push(vertex);
        }
        ring = new THREE.ParticleSystem(saturnRingGeom, saturnRingMat);
        ring.castShadow = true;
        ring.receiveShadow = true;
        scene.add(ring);

        uranus = new SpaceObject("textures/uranus.jpg", 120, 20).init();
        scene.add(uranus);

        neptune = new SpaceObject("textures/neptune.jpg", 110, 20).init();
        scene.add(neptune);
    }
    ///////////////////////////////////////////  Planets orbits
    planetsOrbitsArray = [9000, 12000, 18000, 30000, 40000, 50000, 60000, 70000];
    planetsOrbitsArray.forEach(function(item) {
        let planetOrbitGeom = new THREE.Geometry(),
            planetOrbitMat = new THREE.ParticleBasicMaterial({ color: 0x444444, opacity: 0.1, size: 1, sizeAttenuation: false });

        for (let i = 0; i < 2000; i++) {
            let vertex = new THREE.Vector3();
            vertex.x = Math.sin(180 / Math.PI * i) * item;
            vertex.z = Math.cos(180 / Math.PI * i) * item;
            planetOrbitGeom.vertices.push(vertex);
        }
        let planetOrbit = new THREE.ParticleSystem(planetOrbitGeom, planetOrbitMat);
        planetOrbit.castShadow = true;
        scene.add(planetOrbit);
    });

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

        mars.position.x = Math.sin(t * 0.04) * 30000;
        mars.position.z = Math.cos(t * 0.04) * 30000;

        jupiter.position.x = Math.sin(t * 0.025) * 40000;
        jupiter.position.z = Math.cos(t * 0.025) * 40000;

        saturn.position.x = Math.sin(t * 0.05) * 50000;
        saturn.position.z = Math.cos(t * 0.05) * 50000;
        ring.position.x = saturn.position.x;
        ring.position.z = saturn.position.z;
        ring.rotation.x = 75;

        uranus.position.x = Math.sin(t * 0.05) * 60000;
        uranus.position.z = Math.cos(t * 0.05) * 60000;

        neptune.position.x = Math.sin(t * 0.6) * 70000;
        neptune.position.z = Math.cos(t * 0.6) * 70000;

        ///////////////////////////////////////////////////////////////////////

        mercury.rotation.y += 0.005;
        venus.rotation.y += 0.005;
        earth.rotation.y += 0.005;
        mars.rotation.y += 0.005;
        jupiter.rotation.y += 0.005;
        saturn.rotation.y += 0.002;
        ring.rotation.y -= 0.003;
        uranus.rotation.y += 0.005;
        neptune.rotation.y += 0.005;


        // camera.position.x = earth.position.x - 700;
        // camera.position.y = earth.position.y - 300;
        // camera.position.z = earth.position.z - 1000;
        // camera.lookAt(earth.position);


        camera.position.x = mercury.position.x - 700;
        camera.position.y = mercury.position.y - 300;
        camera.position.z = mercury.position.z - 1000;
        camera.lookAt(mercury.position);

        t += Math.PI / 180 * 2;

        renderer.render(scene, camera);

    };
    // let helper = new THREE.CameraHelper(pointLight.shadow.camera);
    // scene.add(helper);
    // let sphereSize = 1;
    // let pointLightHelper = new THREE.PointLightHelper(pointLight, sphereSize);
    // scene.add(pointLightHelper);
    planetRendering();
    rendering();
    
    console.timeEnd('T1');
}