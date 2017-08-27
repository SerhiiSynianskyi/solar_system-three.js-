window.onload = function() {
    console.time('T1');
    let scene, camera, renderer, container, w, h;
    w = parseInt(document.body.clientWidth);
    h = parseInt(document.body.clientHeight);

    container = document.createElement('div');
    document.body.appendChild(container);
    ////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 200000);
    camera.position.set(50000, 50000, 50000);
    // camera.position.x = 50000;
    // camera.position.y = 50000;
    // camera.position.z = 50000;
    scene = new THREE.Scene();

    ////////////////////////////////////////////////////////////////

    let light = new THREE.AmbientLight(0x101010), // soft white light // TODO - refactor
        pointLightArray = [{
                'x': 0,
                'y': 0,
                'z': 7000
            },
            {
                'x': 0,
                'y': 0,
                'z': -7000
            }        
            // },
            // {
            //     'x': 7000,
            //     'y': 0,
            //     'z': 0
            // },
            // {
            //     'x': -7000,
            //     'y': 0,
            //     'z': 0
            // },
            // {
            //     'x': 0,
            //     'y': 7000,
            //     'z': 0
            // },
            // {
            //     'x': 0,
            //     'y': -7000,
            //     'z': 0
            // }
        ];
    pointLightArray.forEach(function(item) {
        let pointLight = new THREE.PointLight(0xffffff, 0.6, 75000);
        pointLight.position.set(item.x, item.y, item.z);
        pointLight.castShadow = true;
        pointLight.ShadowMapWidth = 512;
        pointLight.ShadowMapHeight = 512;
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
    let spObjs = {};

    function planetRendering() {

        spObjs.sun = new SpaceObject("textures/sun.jpg", 2000, 30).init();
        scene.add(spObjs.sun);

        spObjs.mercury = new SpaceObject("textures/mercury.jpg", 60, 20).init();
        scene.add(spObjs.mercury);

        spObjs.venus = new SpaceObject("textures/venus.jpg", 60, 20).init();
        scene.add(spObjs.venus);

        spObjs.earth = new SpaceObject("textures/earth.jpg", 100, 40).init();
        scene.add(spObjs.earth);

        spObjs.mars = new SpaceObject("textures/mars.jpg", 80, 20).init();
        scene.add(spObjs.mars);

        spObjs.jupiter = new SpaceObject("textures/jupiter.jpg", 350, 50).init();
        scene.add(spObjs.jupiter);

        spObjs.saturn = new SpaceObject("textures/saturn.jpg", 230, 50).init();
        scene.add(spObjs.saturn);

        let saturnRingGeom = new THREE.Geometry(),
            saturnRingMat = new THREE.ParticleBasicMaterial({ color: 0x3a3a3a, opacity: 0.6, size: 1, sizeAttenuation: false });

        for (let i = 0; i < 20000; i++) {
            let vertex = new THREE.Vector3();
            vertex.x = Math.sin(180 / Math.PI * i) * (550 - i / 100);
            vertex.y = Math.random() * 20;
            vertex.z = Math.cos(180 / Math.PI * i) * (550 - i / 100);
            saturnRingGeom.vertices.push(vertex);
        }
        spObjs.ring = new THREE.ParticleSystem(saturnRingGeom, saturnRingMat);
        spObjs.ring.castShadow = true;
        spObjs.ring.receiveShadow = true;
        scene.add(spObjs.ring);

        spObjs.uranus = new SpaceObject("textures/uranus.jpg", 120, 20).init();
        scene.add(spObjs.uranus);

        spObjs.neptune = new SpaceObject("textures/neptune.jpg", 110, 20).init();
        scene.add(spObjs.neptune);
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

    let showPlanet = false,
        planetName;

    function rendering() {
        requestAnimationFrame(rendering);

        spObjs.sun.rotation.y += 0.003;
        spObjs.mercury.position.x = Math.sin(t * 0.15) * 9000;
            spObjs.mercury.position.z = Math.cos(t * 0.15) * 9000;

            spObjs.venus.position.x = Math.sin(t * 0.1) * 12000;
            spObjs.venus.position.z = Math.cos(t * 0.1) * 12000;

            spObjs.earth.position.x = Math.sin(t * 0.05) * 18000;
            spObjs.earth.position.z = Math.cos(t * 0.05) * 18000;

            spObjs.mars.position.x = Math.sin(t * 0.04) * 30000;
            spObjs.mars.position.z = Math.cos(t * 0.04) * 30000;

            spObjs.jupiter.position.x = Math.sin(t * 0.025) * 40000;
            spObjs.jupiter.position.z = Math.cos(t * 0.025) * 40000;

            spObjs.saturn.position.x = Math.sin(t * 0.05) * 50000;
            spObjs.saturn.position.z = Math.cos(t * 0.05) * 50000;
            spObjs.ring.position.x = spObjs.saturn.position.x;
            spObjs.ring.position.z = spObjs.saturn.position.z;
            spObjs.ring.rotation.x = 75;

            spObjs.uranus.position.x = Math.sin(t * 0.05) * 60000;
            spObjs.uranus.position.z = Math.cos(t * 0.05) * 60000;

            spObjs.neptune.position.x = Math.sin(t * 0.6) * 70000;
            spObjs.neptune.position.z = Math.cos(t * 0.6) * 70000;
        if (!showPlanet) {
           controls.update();
        }    
            
         else {
            moveToPlanet(planetName)
        }
        ///////////////////////////////////////////////////////////////////////

        spObjs.mercury.rotation.y += 0.005;
        spObjs.venus.rotation.y += 0.005;
        spObjs.earth.rotation.y += 0.005;
        spObjs.mars.rotation.y += 0.005;
        spObjs.jupiter.rotation.y += 0.005;
        spObjs.saturn.rotation.y += 0.002;
        spObjs.ring.rotation.y -= 0.003;
        spObjs.uranus.rotation.y += 0.005;
        spObjs.neptune.rotation.y += 0.005;


        // camera.position.x = mercury.position.x - 700;
        // camera.position.y = mercury.position.y - 300;
        // camera.position.z = mercury.position.z - 1000;
        // camera.lookAt(mercury.position);

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

    function moveToPlanet(planet) {
        if (camera.position.y > spObjs[planet].position.y -200) {
            camera.position.y -= 100;
        }

        camera.position.x = spObjs[planet].position.x - 700;
        camera.position.z = spObjs[planet].position.z - 300;
        camera.lookAt(spObjs[planet].position);
    }

    let wrapper = document.getElementById('wrapper');
    wrapper.addEventListener('click', function(e) {
        if (e.target.nodeName === 'BUTTON') {
            showInfo(e.target.value);
        }
    });

    function showInfo(data) {
        if (data === 'system'){
            planetName = false
            showPlanet = false;
            camera.position.set(50000, 50000, 50000);
        }
        else {
            planetName = data
            showPlanet = true;
        }
    }

    console.timeEnd('T1');
}