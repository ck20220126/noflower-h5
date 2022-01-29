const env_ios = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

function isIOSX() {
  return (
    env_ios &&
    window.screen.height >= 812 &&
    window.devicePixelRatio &&
    window.devicePixelRatio >= 2
  );
}

export default isIOSX();
