// QR Code Generator Script

let qrcode = null;

// Initialize
window.addEventListener('DOMContentLoaded', function() {
  // Generate initial QR code
  generateQR();

  // Add event listeners for real-time updates
  document.getElementById('qrText').addEventListener('input', generateQR);
  document.getElementById('qrSize').addEventListener('change', generateQR);
  document.getElementById('errorLevel').addEventListener('change', generateQR);
  document.getElementById('colorDark').addEventListener('input', generateQR);
  document.getElementById('colorLight').addEventListener('input', generateQR);

  // Check cookie consent
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieBanner').classList.add('show');
  }
});

// Generate QR Code
function generateQR() {
  const text = document.getElementById('qrText').value;
  const size = parseInt(document.getElementById('qrSize').value);
  const errorLevel = document.getElementById('errorLevel').value;
  const colorDark = document.getElementById('colorDark').value;
  const colorLight = document.getElementById('colorLight').value;

  // Clear previous QR code
  const qrcodeContainer = document.getElementById('qrcode');
  qrcodeContainer.innerHTML = '';

  // Validate input
  if (!text.trim()) {
    qrcodeContainer.innerHTML = '<p style="color: var(--text-light);">텍스트를 입력하면 QR코드가 생성됩니다.</p>';
    return;
  }

  // Generate new QR code
  try {
    qrcode = new QRCode(qrcodeContainer, {
      text: text,
      width: size,
      height: size,
      colorDark: colorDark,
      colorLight: colorLight,
      correctLevel: QRCode.CorrectLevel[errorLevel]
    });
  } catch (error) {
    qrcodeContainer.innerHTML = '<p style="color: var(--danger-color);">QR코드 생성 중 오류가 발생했습니다.</p>';
    console.error('QR Code generation error:', error);
  }
}

// Download QR Code as PNG
function downloadQR() {
  const qrcodeContainer = document.getElementById('qrcode');
  const canvas = qrcodeContainer.querySelector('canvas');

  if (!canvas) {
    alert('먼저 QR코드를 생성해주세요.');
    return;
  }

  try {
    // Convert canvas to blob
    canvas.toBlob(function(blob) {
      // Create download link
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';

      // Trigger download
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // Clean up
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    // Fallback for older browsers
    try {
      const url = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = url;
      link.download = 'qrcode.png';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (fallbackError) {
      alert('다운로드 중 오류가 발생했습니다. 이미지를 마우스 오른쪽 버튼으로 클릭하여 저장해주세요.');
      console.error('Download error:', fallbackError);
    }
  }
}

// Cookie Consent
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieBanner').classList.remove('show');
}
