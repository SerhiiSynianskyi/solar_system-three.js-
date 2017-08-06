window.onload = function() {
    let scene, camera, renderer, container,
        w, h;
    w = parseInt(document.body.clientWidth);
    h = parseInt(document.body.clientHeight);

    container = document.createElement('div');
    document.body.appendChild(container);
    ////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 100000);
    camera.position.z = 4300;
    scene = new THREE.Scene();

    ////////////////////////////////////////////////////////////////

    var light = new THREE.AmbientLight(0xffffff); // soft white light
    scene.add(light);

    //////////////////////////////////////////////////////////////// - sun
    let sun, sun_geom, sun_mat;
    sum_geom = new THREE.SphereGeometry(430, 30, 30);
    sun_mat = new THREE.MeshNormalMaterial();
    sun = new THREE.Mesh(sum_geom, sun_mat);
    scene.add(sun);
     //////////////////////////////////////////////////////////////// - sun
    let earth, earth_geom, earth_mat;
    earth_geom = new THREE.SphereGeometry(50, 20, 20);
    earth_mat = new THREE.MeshNormalMaterial();
    earth = new THREE.Mesh(earth_geom, earth_mat);
    earth.position.z = 2000;
    scene.add(earth);
    //////////////////////////////////////////////////////////////////
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor(0x000000);
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    //////////////////////////////////////////////////////

    let controls = new THREE.TrackballControls(camera);


    let t = 0;
    function rendering() {
        requestAnimationFrame(rendering);
        controls.update();

        sun.rotation.y += 0.01;
        earth.position.x = Math.sin(t*0.1)*2000;
    	earth.position.z = Math.cos(t*0.1)*2000;

    	t += Math.PI/180*2;
        renderer.render(scene, camera);
    };
    // var helper = new THREE.CameraHelper(amColor.shadow.camera);
    // scene.add(helper);
    rendering();
}