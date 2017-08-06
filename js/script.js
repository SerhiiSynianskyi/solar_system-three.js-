window.onload = function() {
    let scene, camera, renderer, container,
        w, h;
    w = parseInt(document.body.clientWidth);
    h = parseInt(document.body.clientHeight);

    container = document.createElement('div');
    document.body.appendChild(container);
    ////////////////////////////////////////////////////////////////
    camera = new THREE.PerspectiveCamera(45, w / h, 1, 10000);
    camera.position.z = 4500;
    scene = new THREE.Scene();
    ////////////////////////////////////////////////////////////////

    //////////////////////////////////////////////////////////////////
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(w, h);
    container.appendChild(renderer.domElement);

    function rendering() {
        requestAnimationFrame(rendering);
        renderer.render(scene, camera);
    };
    rendering();
}