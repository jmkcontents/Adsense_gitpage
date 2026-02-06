// Color Converter Script

let recentColors = [];
const MAX_RECENT_COLORS = 10;

// Initialize
window.addEventListener('DOMContentLoaded', function() {
  // Set initial color
  updateAllFormats('#ff6b35');

  // Add event listeners
  document.getElementById('colorPicker').addEventListener('input', function() {
    updateAllFormats(this.value);
    addToRecentColors(this.value);
  });

  document.getElementById('hexInput').addEventListener('input', function() {
    const value = this.value.trim();
    if (isValidHex(value)) {
      updateAllFormats(value);
      addToRecentColors(value);
    }
  });

  document.getElementById('rgbInput').addEventListener('input', function() {
    const value = this.value.trim();
    if (isValidRgb(value)) {
      const hex = rgbToHex(value);
      updateAllFormats(hex);
      addToRecentColors(hex);
    }
  });

  document.getElementById('hslInput').addEventListener('input', function() {
    const value = this.value.trim();
    if (isValidHsl(value)) {
      const hex = hslToHex(value);
      updateAllFormats(hex);
      addToRecentColors(hex);
    }
  });

  // Check cookie consent
  if (!localStorage.getItem('cookieConsent')) {
    document.getElementById('cookieBanner').classList.add('show');
  }
});

// Update all color formats
function updateAllFormats(hexColor) {
  // Normalize hex color
  hexColor = hexColor.toUpperCase();
  if (!hexColor.startsWith('#')) {
    hexColor = '#' + hexColor;
  }

  // Update color picker
  document.getElementById('colorPicker').value = hexColor;

  // Update preview
  document.getElementById('colorPreview').style.backgroundColor = hexColor;

  // Update HEX input
  document.getElementById('hexInput').value = hexColor;

  // Update RGB input
  const rgb = hexToRgb(hexColor);
  document.getElementById('rgbInput').value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;

  // Update HSL input
  const hsl = hexToHsl(hexColor);
  document.getElementById('hslInput').value = `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
}

// HEX to RGB conversion
function hexToRgb(hex) {
  // Remove # if present
  hex = hex.replace('#', '');

  // Parse hex values
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  return { r, g, b };
}

// RGB to HEX conversion
function rgbToHex(rgb) {
  // Extract RGB values
  const match = rgb.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
  if (!match) return '#000000';

  const r = parseInt(match[1]);
  const g = parseInt(match[2]);
  const b = parseInt(match[3]);

  // Convert to hex
  const toHex = (n) => {
    const hex = Math.max(0, Math.min(255, n)).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// HEX to HSL conversion
function hexToHsl(hex) {
  const rgb = hexToRgb(hex);
  return rgbToHsl(rgb.r, rgb.g, rgb.b);
}

// RGB to HSL conversion
function rgbToHsl(r, g, b) {
  r /= 255;
  g /= 255;
  b /= 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h, s, l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  h = Math.round(h * 360);
  s = Math.round(s * 100);
  l = Math.round(l * 100);

  return { h, s, l };
}

// HSL to HEX conversion
function hslToHex(hsl) {
  // Extract HSL values
  const match = hsl.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
  if (!match) return '#000000';

  let h = parseInt(match[1]) / 360;
  let s = parseInt(match[2]) / 100;
  let l = parseInt(match[3]) / 100;

  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1/6) return p + (q - p) * 6 * t;
      if (t < 1/2) return q;
      if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
      return p;
    };

    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;

    r = hue2rgb(p, q, h + 1/3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1/3);
  }

  const toHex = (n) => {
    const hex = Math.round(n * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };

  return `#${toHex(r)}${toHex(g)}${toHex(b)}`.toUpperCase();
}

// Validation functions
function isValidHex(hex) {
  return /^#?[0-9A-Fa-f]{6}$/.test(hex);
}

function isValidRgb(rgb) {
  return /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/.test(rgb);
}

function isValidHsl(hsl) {
  return /^hsl\(\s*\d{1,3}\s*,\s*\d{1,3}%\s*,\s*\d{1,3}%\s*\)$/.test(hsl);
}

// Copy to clipboard
function copyToClipboard(inputId) {
  const input = document.getElementById(inputId);
  input.select();
  input.setSelectionRange(0, 99999);

  try {
    document.execCommand('copy');
    alert('클립보드에 복사되었습니다: ' + input.value);
  } catch (err) {
    navigator.clipboard.writeText(input.value).then(function() {
      alert('클립보드에 복사되었습니다: ' + input.value);
    }, function() {
      alert('복사에 실패했습니다.');
    });
  }
}

// Recent colors management
function addToRecentColors(hexColor) {
  // Normalize color
  hexColor = hexColor.toUpperCase();

  // Remove if already exists
  recentColors = recentColors.filter(c => c !== hexColor);

  // Add to beginning
  recentColors.unshift(hexColor);

  // Limit to MAX_RECENT_COLORS
  if (recentColors.length > MAX_RECENT_COLORS) {
    recentColors = recentColors.slice(0, MAX_RECENT_COLORS);
  }

  // Update display
  displayRecentColors();
}

function displayRecentColors() {
  const container = document.getElementById('recentColors');
  const section = document.getElementById('recentColorsSection');

  if (recentColors.length === 0) {
    section.classList.add('hidden');
    return;
  }

  section.classList.remove('hidden');

  container.innerHTML = recentColors.map(color => `
    <div style="
      width: 50px;
      height: 50px;
      background-color: ${color};
      border: 2px solid #dee2e6;
      border-radius: 8px;
      cursor: pointer;
      transition: transform 0.2s;
    "
    onclick="updateAllFormats('${color}')"
    onmouseover="this.style.transform='scale(1.1)'"
    onmouseout="this.style.transform='scale(1)'"
    title="${color}"></div>
  `).join('');
}

// Cookie Consent
function acceptCookies() {
  localStorage.setItem('cookieConsent', 'true');
  document.getElementById('cookieBanner').classList.remove('show');
}
