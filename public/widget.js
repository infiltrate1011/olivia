(function () {
  const iframe = document.createElement('iframe');
  iframe.src = 'https://olivia-a6511hvnr-brandons-projects-b63bea5d.vercel.app';
  iframe.style = `
    position: fixed;
    bottom: 80px;
    right: 24px;
    width: 400px;
    height: 600px;
    border: none;
    z-index: 9999;
    border-radius: 12px;
    box-shadow: 0 0 12px rgba(0,0,0,0.15);
    display: none;
  `;
  iframe.id = 'olivia-frame';
  document.body.appendChild(iframe);

  const button = document.createElement('div');
  button.id = 'olivia-launcher';
  button.style = `
    position: fixed;
    bottom: 24px;
    right: 24px;
    width: 60px;
    height: 60px;
    background-color: #ff7eb9;
    border-radius: 50%;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    cursor: pointer;
    z-index: 10000;
    background-image: url('https://img.icons8.com/ios-filled/50/ffffff/chat.png');
    background-repeat: no-repeat;
    background-position: center;
  `;
  button.onclick = () => {
    iframe.style.display = iframe.style.display === 'none' ? 'block' : 'none';
  };
  document.body.appendChild(button);
})();// deploy force
