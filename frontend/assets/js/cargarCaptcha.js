function reloadCaptcha() {
    fetch('v1/captcha')
        .then(res => res.text())
        .then(svg => {
            document.getElementById('cap').innerHTML = svg;
        });
}